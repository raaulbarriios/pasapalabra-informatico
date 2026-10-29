// Lógica principal de Pasapalabra Informático (Edición Halloween)
(function () {
  "use strict";

  const ALPHABET = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ];

  const TOTAL_TIME = 300; // Segundos por partida (5 minutos)

  // Estado del juego
  let currentRoundQuestions = [];
  let currentLetterIdx = 0;
  let letterStates = []; // 'pending', 'correct', 'incorrect'
  let userResponses = [];
  let correctCount = 0;
  let incorrectCount = 0;
  let timeRemaining = TOTAL_TIME;
  let timerInterval = null;
  let isPaused = false;
  let isGameOver = false;
  let soundEnabled = true;
  let currentPlayerName = "Anonimo";
  let currentPlayerCourse = "1º SMR";

  // Web Audio Context (Efectos de sonido Halloween)
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playTone(freq, type, duration, delay = 0, vol = 0.15) {
    if (!soundEnabled || !audioCtx) return;
    try {
      const startTime = audioCtx.currentTime + delay;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(vol, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }

  function playSound(type) {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    if (type === "correct") {
      playTone(523.25, "sine", 0.15, 0, 0.2); // C5
      playTone(659.25, "sine", 0.15, 0.1, 0.2); // E5
      playTone(783.99, "sine", 0.3, 0.2, 0.25); // G5
    } else if (type === "incorrect") {
      playTone(180, "sawtooth", 0.2, 0, 0.25);
      playTone(125, "sawtooth", 0.35, 0.15, 0.25);
    } else if (type === "pass") {
      playTone(440, "triangle", 0.12, 0, 0.15);
      playTone(554.37, "triangle", 0.18, 0.08, 0.15);
    } else if (type === "tick") {
      playTone(880, "square", 0.04, 0, 0.05);
    } else if (type === "gameover") {
      playTone(392.00, "sine", 0.25, 0, 0.2);    // G4
      playTone(466.16, "sine", 0.25, 0.2, 0.2);  // Bb4
      playTone(587.33, "sine", 0.3, 0.4, 0.2);   // D5
      playTone(739.99, "sine", 0.6, 0.65, 0.25); // F#5
    }
  }

  // Normalización de texto para comparación flexible
  function normalizeText(str) {
    if (!str) return "";
    return str
      .toLowerCase()
      .trim()
      .replace(/ñ/g, "__enie__")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/__enie__/g, "ñ")
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Vistas
  const homeView = document.getElementById("homeView");
  const gameView = document.getElementById("gameView");
  const menuBtn = document.getElementById("menuBtn");
  const startGameBtn = document.getElementById("startGameBtn");
  const viewScoresBtn = document.getElementById("viewScoresBtn");
  const cardStartGame = document.getElementById("cardStartGame");
  const cardViewScores = document.getElementById("cardViewScores");
  const playerNameInput = document.getElementById("playerNameInput");
  const playerCourseSelect = document.getElementById("playerCourseSelect");
  const nameValidationMsg = document.getElementById("nameValidationMsg");

  // Elementos del DOM del Rosco
  const roscoCircle = document.getElementById("roscoCircle");
  const timerNumEl = document.getElementById("timerNum");
  const clueIndicatorEl = document.getElementById("clueIndicator");
  const clueTextEl = document.getElementById("clueText");
  const feedbackMsgEl = document.getElementById("feedbackMsg");
  const answerForm = document.getElementById("answerForm");
  const answerInput = document.getElementById("answerInput");
  const submitBtn = document.getElementById("submitBtn");
  const passBtn = document.getElementById("passBtn");
  const scoreCorrectEl = document.getElementById("scoreCorrect");
  const scoreIncorrectEl = document.getElementById("scoreIncorrect");
  const scorePendingEl = document.getElementById("scorePending");
  const pauseBtn = document.getElementById("pauseBtn");
  const soundBtn = document.getElementById("soundBtn");
  const restartBtn = document.getElementById("restartBtn");
  const rankingBtn = document.getElementById("rankingBtn");

  // Modales
  const gameOverModal = document.getElementById("gameOverModal");
  const gameOverTitle = document.getElementById("gameOverTitle");
  const playAgainBtn = document.getElementById("playAgainBtn");
  const viewRankingFromGameOverBtn = document.getElementById("viewRankingFromGameOverBtn");
  const backToMenuFromGameOverBtn = document.getElementById("backToMenuFromGameOverBtn");
  const saveScoreNotice = document.getElementById("saveScoreNotice");
  const statCorrectEl = document.getElementById("statCorrect");
  const statIncorrectEl = document.getElementById("statIncorrect");
  const statPendingEl = document.getElementById("statPending");
  const statTimeEl = document.getElementById("statTime");
  const reviewListEl = document.getElementById("reviewList");

  // Modal de Ranking
  const rankingModal = document.getElementById("rankingModal");
  const rankingTableBody = document.getElementById("rankingTableBody");
  const closeRankingBtn = document.getElementById("closeRankingBtn");
  const closeRankingFooterBtn = document.getElementById("closeRankingFooterBtn");
  const refreshRankingBtn = document.getElementById("refreshRankingBtn");
  const playFromRankingBtn = document.getElementById("playFromRankingBtn");

  // Cargar nombre y curso recordados del jugador (sin valores anónimos por defecto)
  try {
    const savedName = localStorage.getItem("pasapalabra_player_name");
    if (savedName && savedName.toLowerCase() !== "anonimo" && playerNameInput) {
      playerNameInput.value = savedName;
    } else if (playerNameInput) {
      playerNameInput.value = "";
    }
    const savedCourse = localStorage.getItem("pasapalabra_player_course");
    if (savedCourse && playerCourseSelect) {
      playerCourseSelect.value = savedCourse;
      currentPlayerCourse = savedCourse;
    }
  } catch (e) {}

  if (playerNameInput) {
    playerNameInput.addEventListener("input", () => {
      playerNameInput.classList.remove("input-error");
      if (nameValidationMsg) {
        nameValidationMsg.textContent = "";
      }
    });
  }

  // Control de Vistas
  function showHomeView() {
    if (timerInterval) clearInterval(timerInterval);
    isPaused = false;
    isGameOver = false;

    gameOverModal.classList.remove("active");
    rankingModal.classList.remove("active");
    gameView.classList.add("hidden");
    homeView.classList.remove("hidden");

    pauseBtn.style.display = "none";
    restartBtn.style.display = "none";
  }

  function launchGameFromMenu() {
    initAudio();

    const nameVal = playerNameInput ? playerNameInput.value.trim() : "";
    if (!nameVal || nameVal.toLowerCase() === "anonimo") {
      if (playerNameInput) {
        playerNameInput.classList.add("input-error");
        playerNameInput.focus();
      }
      if (nameValidationMsg) {
        nameValidationMsg.textContent = "⚠️ Debes escribir tu nombre o alias para poder jugar.";
      }
      return;
    }

    if (nameValidationMsg) nameValidationMsg.textContent = "";
    if (playerNameInput) playerNameInput.classList.remove("input-error");

    currentPlayerName = nameVal;
    try {
      localStorage.setItem("pasapalabra_player_name", currentPlayerName);
    } catch (e) {}

    if (playerCourseSelect) {
      currentPlayerCourse = playerCourseSelect.value || "1º SMR";
      try {
        localStorage.setItem("pasapalabra_player_course", currentPlayerCourse);
      } catch (e) {}
    }

    homeView.classList.add("hidden");
    rankingModal.classList.remove("active");
    gameOverModal.classList.remove("active");
    gameView.classList.remove("hidden");

    pauseBtn.style.display = "";
    restartBtn.style.display = "";

    startNewGame();
  }

  // Renderizar los 27 nodos del Rosco en disposición circular
  function renderRoscoNodes() {
    roscoCircle.innerHTML = "";
    const total = ALPHABET.length;
    const startAngle = -Math.PI / 2;

    for (let i = 0; i < total; i++) {
      const angle = startAngle + (2 * Math.PI * i) / total;
      const radius = 43.5;
      const left = 50 + radius * Math.cos(angle);
      const top = 50 + radius * Math.sin(angle);

      const node = document.createElement("div");
      node.className = `letter-node state-${letterStates[i] || "pending"}`;
      if (i === currentLetterIdx && !isGameOver) {
        node.classList.add("state-active");
      }
      node.style.left = `${left}%`;
      node.style.top = `${top}%`;
      node.textContent = ALPHABET[i];
      node.dataset.index = i;

      node.addEventListener("click", () => {
        if (!isGameOver && !isPaused && letterStates[i] === "pending") {
          currentLetterIdx = i;
          updateView();
        }
      });

      roscoCircle.appendChild(node);
    }
  }

  // Seleccionar aleatoriamente una pregunta por letra del banco
  function generateNewQuestionSet() {
    currentRoundQuestions = [];
    for (let i = 0; i < ALPHABET.length; i++) {
      const letter = ALPHABET[i];
      const bank = QUESTION_BANK[letter];
      if (!bank || bank.length === 0) {
        currentRoundQuestions.push({
          type: "starts",
          question: `Concepto informático que comienza por ${letter}`,
          answer: letter,
          aliases: [letter.toLowerCase()]
        });
      } else {
        const randIdx = Math.floor(Math.random() * bank.length);
        currentRoundQuestions.push({
          ...bank[randIdx],
          letter: letter
        });
      }
    }
  }

  // Iniciar una nueva partida
  function startNewGame() {
    generateNewQuestionSet();
    letterStates = new Array(ALPHABET.length).fill("pending");
    userResponses = new Array(ALPHABET.length).fill("");
    currentLetterIdx = 0;
    correctCount = 0;
    incorrectCount = 0;
    timeRemaining = TOTAL_TIME;
    isPaused = false;
    isGameOver = false;

    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    gameOverModal.classList.remove("active");
    rankingModal.classList.remove("active");
    if (saveScoreNotice) saveScoreNotice.textContent = "";
    pauseBtn.innerHTML = '⏸ <span class="btn-text">Pausar</span>';

    renderRoscoNodes();
    updateView();
    startTimer();
    answerInput.disabled = false;
    submitBtn.disabled = false;
    passBtn.disabled = false;
    answerInput.value = "";
    answerInput.focus();
  }

  // Temporizador
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (isPaused || isGameOver) return;
      timeRemaining--;
      updateTimerDisplay();

      if (timeRemaining <= 10 && timeRemaining > 0) {
        playSound("tick");
      }

      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        endGame(false, "🎃 ¡El tiempo se ha consumido!");
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    timerNumEl.textContent = timeRemaining;
    if (timeRemaining <= 25) {
      timerNumEl.classList.add("warning");
    } else {
      timerNumEl.classList.remove("warning");
    }
  }

  // Actualizar interfaz del rosco
  function updateView() {
    const q = currentRoundQuestions[currentLetterIdx];
    const letter = ALPHABET[currentLetterIdx];

    if (q.type === "contains") {
      clueIndicatorEl.textContent = `Contiene la ${letter}`;
    } else {
      clueIndicatorEl.textContent = `Empieza por ${letter}`;
    }

    clueTextEl.textContent = q.question;

    const nodes = roscoCircle.querySelectorAll(".letter-node");
    nodes.forEach((node, idx) => {
      node.className = `letter-node state-${letterStates[idx]}`;
      if (idx === currentLetterIdx && !isGameOver) {
        node.classList.add("state-active");
      }
    });

    scoreCorrectEl.textContent = correctCount;
    scoreIncorrectEl.textContent = incorrectCount;
    const pendingCount = letterStates.filter((s) => s === "pending").length;
    scorePendingEl.textContent = pendingCount;

    updateTimerDisplay();
    answerInput.focus();
  }

  function showFeedback(text, type = "info") {
    feedbackMsgEl.textContent = text;
    feedbackMsgEl.className = `feedback-msg ${type}`;
    clearTimeout(feedbackMsgEl.dataset.timeoutId);
    const timeoutId = setTimeout(() => {
      feedbackMsgEl.textContent = "";
      feedbackMsgEl.className = "feedback-msg";
    }, 2800);
    feedbackMsgEl.dataset.timeoutId = timeoutId;
  }

  function getNextPendingIndex(fromIndex) {
    for (let offset = 1; offset <= ALPHABET.length; offset++) {
      const nextIdx = (fromIndex + offset) % ALPHABET.length;
      if (letterStates[nextIdx] === "pending") {
        return nextIdx;
      }
    }
    return -1;
  }

  // Procesar respuesta
  function handleAnswer() {
    if (isGameOver || isPaused) return;
    const rawVal = answerInput.value;
    const cleanUser = normalizeText(rawVal);
    const currentQ = currentRoundQuestions[currentLetterIdx];

    // Si se envía en blanco, cuenta como fallo
    if (!cleanUser) {
      userResponses[currentLetterIdx] = "(En blanco)";
      letterStates[currentLetterIdx] = "incorrect";
      incorrectCount++;
      playSound("incorrect");
      showFeedback(`Fallo (en blanco). Solución: ${currentQ.answer}`, "incorrect");
      answerInput.value = "";

      const nextIdx = getNextPendingIndex(currentLetterIdx);
      if (nextIdx === -1) {
        endGame(true, "🎃 ¡Has completado el rosco!");
      } else {
        currentLetterIdx = nextIdx;
        updateView();
      }
      return;
    }

    userResponses[currentLetterIdx] = rawVal.trim();
    const normalizedCorrect = normalizeText(currentQ.answer);
    const normalizedAliases = (currentQ.aliases || []).map((a) => normalizeText(a));

    const isCorrect =
      cleanUser === normalizedCorrect || normalizedAliases.includes(cleanUser);

    if (isCorrect) {
      letterStates[currentLetterIdx] = "correct";
      correctCount++;
      playSound("correct");
      showFeedback(`¡Correcto! ${currentQ.answer}`, "correct");
    } else {
      letterStates[currentLetterIdx] = "incorrect";
      incorrectCount++;
      playSound("incorrect");
      showFeedback(`Incorrecto. Era: ${currentQ.answer}`, "incorrect");
    }

    answerInput.value = "";

    const nextIdx = getNextPendingIndex(currentLetterIdx);
    if (nextIdx === -1) {
      endGame(true, "🎃 ¡Has completado el rosco!");
    } else {
      currentLetterIdx = nextIdx;
      updateView();
    }
  }

  // Pasapalabra
  function handlePass() {
    if (isGameOver || isPaused) return;
    playSound("pass");
    showFeedback("¡Pasapalabra!", "info");
    answerInput.value = "";

    const nextIdx = getNextPendingIndex(currentLetterIdx);
    if (nextIdx === -1) {
      endGame(true, "🎃 ¡Has completado el rosco!");
    } else {
      currentLetterIdx = nextIdx;
      updateView();
    }
  }

  // Pausar / Reanudar
  function togglePause() {
    if (isGameOver) return;
    isPaused = !isPaused;
    if (isPaused) {
      pauseBtn.innerHTML = '▶ <span class="btn-text">Reanudar</span>';
      answerInput.disabled = true;
      submitBtn.disabled = true;
      passBtn.disabled = true;
      showFeedback("Juego en pausa", "info");
    } else {
      pauseBtn.innerHTML = '⏸ <span class="btn-text">Pausar</span>';
      answerInput.disabled = false;
      submitBtn.disabled = false;
      passBtn.disabled = false;
      answerInput.focus();
      showFeedback("", "info");
    }
  }

  // Puntuaciones (Cloud API con fallback local y LocalStorage)
  const CLOUD_SCORES_URL = "https://api.restful-api.dev/objects/ff808181a09d98f701a1874c5cb44b8a";

  async function fetchScoresFromApi() {
    // 1. Intentar obtener desde endpoint Cloud público
    try {
      const res = await fetch(CLOUD_SCORES_URL, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json && json.data && Array.isArray(json.data.scores)) {
          try {
            localStorage.setItem("pasapalabra_scores_cache", JSON.stringify(json.data.scores));
          } catch (e) {}
          return json.data.scores;
        }
      }
    } catch (err) {}

    // 2. Intentar endpoint local (/api/scores) si se estuviera ejecutando server.js
    try {
      const res = await fetch("/api/scores", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        try {
          localStorage.setItem("pasapalabra_scores_cache", JSON.stringify(data));
        } catch (e) {}
        return data;
      }
    } catch (err) {}

    // 3. Fallback a caché en LocalStorage
    try {
      const cached = localStorage.getItem("pasapalabra_scores_cache");
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return [];
  }

  function isBetterScore(candidate, existing) {
    if (candidate.correct > existing.correct) return true;
    if (candidate.correct < existing.correct) return false;
    if (candidate.timeElapsed < existing.timeElapsed) return true;
    if (candidate.timeElapsed > existing.timeElapsed) return false;
    return candidate.incorrect < existing.incorrect;
  }

  async function postScoreToApi(entry) {
    let isRecordUpdated = true;
    let scoresList = [];

    // Cargar puntuaciones actuales de la nube o caché
    try {
      scoresList = await fetchScoresFromApi();
    } catch (e) {
      scoresList = [];
    }
    if (!Array.isArray(scoresList)) scoresList = [];

    // Comprobar si el jugador ya existe (mismo nombre ignorando mayúsculas)
    const existingIdx = scoresList.findIndex(
      s => s.player && s.player.toLowerCase().trim() === entry.player.toLowerCase().trim()
    );

    if (existingIdx !== -1) {
      if (isBetterScore(entry, scoresList[existingIdx])) {
        scoresList[existingIdx] = entry;
        isRecordUpdated = true;
      } else {
        isRecordUpdated = false;
      }
    } else {
      scoresList.push(entry);
      isRecordUpdated = true;
    }

    // Ordenar: mayor número de aciertos primero, menor tiempo de desempate
    scoresList.sort((a, b) => {
      if (b.correct !== a.correct) return b.correct - a.correct;
      return a.timeElapsed - b.timeElapsed;
    });

    const trimmedScores = scoresList.slice(0, 100);

    // Guardar en caché local inmediatamente
    try {
      localStorage.setItem("pasapalabra_scores_cache", JSON.stringify(trimmedScores));
    } catch (e) {}

    // Enviar a la nube pública
    try {
      const res = await fetch(CLOUD_SCORES_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "pasapalabra_leaderboard_halloween_2026",
          data: { scores: trimmedScores }
        })
      });
      if (res.ok) {
        return { online: true, updated: isRecordUpdated };
      }
    } catch (e) {}

    // Si falló la nube, intentar guardar en local opcionalmente
    try {
      fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry)
      }).catch(() => {});
    } catch (e) {}

    return { online: false, updated: isRecordUpdated };
  }

  async function renderRankingTable() {
    rankingTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px;">Cargando puntuaciones...</td></tr>`;
    const scores = await fetchScoresFromApi();

    if (!scores || scores.length === 0) {
      rankingTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px; color:#cbd5e1;">Aún no hay puntuaciones registradas. ¡Sé el primero!</td></tr>`;
      return;
    }

    rankingTableBody.innerHTML = "";
    scores.slice(0, 50).forEach((item, index) => {
      const tr = document.createElement("tr");

      let rankSymbol = `#${index + 1}`;
      if (index === 0) rankSymbol = "🥇";
      else if (index === 1) rankSymbol = "🥈";
      else if (index === 2) rankSymbol = "🥉";

      let courseBadgeClass = "badge-smr";
      let displayCourse = "1º SMR";
      const c = String(item.course || "").trim();
      if (c.toUpperCase().includes("PROFESOR")) {
        courseBadgeClass = "badge-profesores";
        displayCourse = "Profesores";
      } else if (c.includes("2") && c.toUpperCase().includes("ASIR")) {
        courseBadgeClass = "badge-asir2";
        displayCourse = "2º ASIR";
      } else if (c.includes("1") && c.toUpperCase().includes("ASIR")) {
        courseBadgeClass = "badge-asir1";
        displayCourse = "1º ASIR";
      } else if (c.toUpperCase().includes("SMR")) {
        courseBadgeClass = "badge-smr";
        displayCourse = "1º SMR";
      }

      const courseBadge = `<span class="course-badge ${courseBadgeClass}">${displayCourse}</span>`;

      const dateStr = item.date ? new Date(item.date).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }) : "-";

      tr.innerHTML = `
        <td><span class="rank-badge">${rankSymbol}</span></td>
        <td><strong>${escapeHtml(item.player)}</strong></td>
        <td>${courseBadge}</td>
        <td><span style="color:#4ade80; font-weight:800;">🍬 ${item.correct}</span></td>
        <td><span style="color:#f87171;">💀 ${item.incorrect}</span></td>
        <td>${item.timeElapsed}s</td>
        <td style="font-size:0.75rem; color:#94a3b8;">${dateStr}</td>
      `;
      rankingTableBody.appendChild(tr);
    });
  }

  // Finalizar partida
  async function endGame(completedRosco, titleMessage) {
    isGameOver = true;
    if (timerInterval) clearInterval(timerInterval);

    if (!completedRosco) {
      for (let i = 0; i < ALPHABET.length; i++) {
        if (letterStates[i] === "pending") {
          letterStates[i] = "incorrect";
          if (!userResponses[i]) {
            userResponses[i] = "(En blanco)";
          }
          incorrectCount++;
        }
      }
      renderRoscoNodes();
    }

    playSound("gameover");

    const timeElapsed = TOTAL_TIME - timeRemaining;
    gameOverTitle.textContent = titleMessage || "Partida Finalizada";
    statCorrectEl.textContent = correctCount;
    statIncorrectEl.textContent = incorrectCount;
    const remainingPending = letterStates.filter((s) => s === "pending").length;
    statPendingEl.textContent = remainingPending;
    statTimeEl.textContent = `${timeElapsed}s`;

    const scorePayload = {
      player: currentPlayerName,
      course: currentPlayerCourse,
      correct: correctCount,
      incorrect: incorrectCount,
      timeElapsed: timeElapsed,
      totalQuestions: ALPHABET.length,
      date: new Date().toISOString()
    };

    if (saveScoreNotice) {
      saveScoreNotice.textContent = "Guardando puntuación en el ranking online...";
    }

    postScoreToApi(scorePayload).then((result) => {
      if (saveScoreNotice) {
        if (result.updated) {
          saveScoreNotice.innerHTML = `✨ ¡Nueva puntuación máxima de <strong>${escapeHtml(currentPlayerName)}</strong> (${escapeHtml(currentPlayerCourse)}) guardada en el ranking! (${correctCount} aciertos en ${timeElapsed}s)`;
        } else {
          saveScoreNotice.innerHTML = `🛡️ Se conserva tu mejor récord anterior para <strong>${escapeHtml(currentPlayerName)}</strong> (${escapeHtml(currentPlayerCourse)}) en el ranking.`;
        }
      }
    });

    reviewListEl.innerHTML = "";
    for (let i = 0; i < ALPHABET.length; i++) {
      const q = currentRoundQuestions[i];
      const state = letterStates[i];
      const userAns = userResponses[i];

      const item = document.createElement("div");
      item.className = `review-item status-${state}`;

      let icon = "⚪";
      if (state === "correct") icon = "🟢";
      else if (state === "incorrect") icon = "🔴";

      const prefix = q.type === "contains" ? "Contiene la" : "Empieza por";

      item.innerHTML = `
        <div class="review-letter">${ALPHABET[i]}</div>
        <div class="review-details">
          <div class="review-word">
            ${q.answer} <span>(${prefix} ${ALPHABET[i]})</span> ${icon}
          </div>
          <div class="review-clue">${q.question}</div>
          ${
            userAns === "(En blanco)"
              ? `<div class="review-user-ans" style="color:#f87171;">Tu respuesta: <em>(En blanco)</em></div>`
              : userAns
              ? `<div class="review-user-ans">Tu respuesta: <strong>${escapeHtml(
                  userAns
                )}</strong></div>`
              : `<div class="review-user-ans" style="color:#f87171;"><em>Dejada en blanco</em></div>`
          }
        </div>
      `;
      reviewListEl.appendChild(item);
    }

    gameOverModal.classList.add("active");
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text || "";
    return div.innerHTML;
  }

  // Event Listeners Menú y Vistas
  startGameBtn.addEventListener("click", () => {
    launchGameFromMenu();
  });

  cardStartGame.addEventListener("click", (e) => {
    if (e.target !== startGameBtn) {
      launchGameFromMenu();
    }
  });

  viewScoresBtn.addEventListener("click", () => {
    renderRankingTable();
    rankingModal.classList.add("active");
  });

  cardViewScores.addEventListener("click", (e) => {
    if (e.target !== viewScoresBtn) {
      renderRankingTable();
      rankingModal.classList.add("active");
    }
  });

  menuBtn.addEventListener("click", () => {
    if (!gameView.classList.contains("hidden")) {
      if (isGameOver || confirm("¿Volver al Menú Principal? La partida en curso se detendrá.")) {
        showHomeView();
      }
    } else {
      showHomeView();
    }
  });

  playFromRankingBtn.addEventListener("click", () => {
    const nameVal = playerNameInput ? playerNameInput.value.trim() : "";
    if (!nameVal || nameVal.toLowerCase() === "anonimo") {
      rankingModal.classList.remove("active");
      showHomeView();
      if (playerNameInput) {
        playerNameInput.classList.add("input-error");
        playerNameInput.focus();
      }
      if (nameValidationMsg) {
        nameValidationMsg.textContent = "⚠️ Debes escribir tu nombre antes de comenzar a jugar.";
      }
      return;
    }
    rankingModal.classList.remove("active");
    launchGameFromMenu();
  });

  backToMenuFromGameOverBtn.addEventListener("click", () => {
    showHomeView();
  });

  playAgainBtn.addEventListener("click", () => {
    gameOverModal.classList.remove("active");
    startNewGame();
  });

  restartBtn.addEventListener("click", () => {
    if (confirm("¿Reiniciar la partida con un nuevo conjunto de palabras?")) {
      startNewGame();
    }
  });

  pauseBtn.addEventListener("click", () => {
    togglePause();
  });

  soundBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundBtn.innerHTML = soundEnabled ? "🔊" : "🔇";
    soundBtn.title = soundEnabled ? "Silenciar audio" : "Activar audio";
  });

  rankingBtn.addEventListener("click", () => {
    renderRankingTable();
    rankingModal.classList.add("active");
  });

  viewRankingFromGameOverBtn.addEventListener("click", () => {
    renderRankingTable();
    rankingModal.classList.add("active");
  });

  closeRankingBtn.addEventListener("click", () => {
    rankingModal.classList.remove("active");
  });

  closeRankingFooterBtn.addEventListener("click", () => {
    rankingModal.classList.remove("active");
  });

  refreshRankingBtn.addEventListener("click", () => {
    renderRankingTable();
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleAnswer();
  });

  passBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handlePass();
  });

  answerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAnswer();
  });

  // Atajos de teclado globales
  document.addEventListener("keydown", (e) => {
    if (rankingModal.classList.contains("active")) {
      if (e.key === "Escape") {
        rankingModal.classList.remove("active");
      }
      return;
    }

    if (gameOverModal.classList.contains("active")) {
      return;
    }

    if (!homeView.classList.contains("hidden")) {
      if (e.key === "Enter" && document.activeElement === playerNameInput) {
        launchGameFromMenu();
      }
      return;
    }

    if (e.key === "Escape") {
      togglePause();
      return;
    }

    if (e.code === "Space" && document.activeElement === answerInput && answerInput.value.trim() === "") {
      e.preventDefault();
      handlePass();
      return;
    }

    if (!isPaused && !isGameOver && document.activeElement !== answerInput) {
      if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        answerInput.focus();
      }
    }
  });

  // Inicialización inicial
  letterStates = new Array(ALPHABET.length).fill("pending");
  showHomeView();
})();
