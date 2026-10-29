// Servidor HTTP nativo en Node.js para Pasapalabra Informático (Especial Halloween)
// Permite acceso en red local y persistencia de puntuaciones compartidas.

const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = process.env.PORT || 3000;
const SCORES_FILE = path.join(__dirname, "scores.json");

// Inicializar archivo de puntuaciones si no existe
if (!fs.existsSync(SCORES_FILE)) {
  fs.writeFileSync(SCORES_FILE, JSON.stringify([
    {
      player: "Ada_Lovelace_88",
      course: "2º ASIR",
      correct: 25,
      incorrect: 2,
      timeElapsed: 235,
      totalQuestions: 27,
      date: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
      player: "Satoshi_Ghost",
      course: "1º ASIR",
      correct: 23,
      incorrect: 4,
      timeElapsed: 252,
      totalQuestions: 27,
      date: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      player: "Linus_Vampire",
      course: "1º SMR",
      correct: 21,
      incorrect: 6,
      timeElapsed: 268,
      totalQuestions: 27,
      date: new Date(Date.now() - 3600000 * 12).toISOString()
    },
    {
      player: "Grace_Hopper_Bug",
      course: "2º ASIR",
      correct: 19,
      incorrect: 8,
      timeElapsed: 278,
      totalQuestions: 27,
      date: new Date(Date.now() - 3600000 * 20).toISOString()
    }
  ], null, 2), "utf8");
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimes = {
    ".html": "text/html; charset=UTF-8",
    ".css": "text/css; charset=UTF-8",
    ".js": "application/javascript; charset=UTF-8",
    ".json": "application/json; charset=UTF-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon"
  };
  return mimes[ext] || "application/octet-stream";
}

function loadScores() {
  try {
    if (!fs.existsSync(SCORES_FILE)) return [];
    const data = fs.readFileSync(SCORES_FILE, "utf8").trim();
    if (!data) return [];
    const parsed = JSON.parse(data);
    // Ordenar: mayor número de aciertos, luego menor tiempo empleado
    parsed.sort((a, b) => {
      if (b.correct !== a.correct) return b.correct - a.correct;
      return a.timeElapsed - b.timeElapsed;
    });
    return parsed;
  } catch (e) {
    console.error("Error leyendo scores.json:", e);
    return [];
  }
}

function isBetterScore(candidate, existing) {
  if (candidate.correct > existing.correct) return true;
  if (candidate.correct < existing.correct) return false;
  if (candidate.timeElapsed < existing.timeElapsed) return true;
  if (candidate.timeElapsed > existing.timeElapsed) return false;
  return candidate.incorrect < existing.incorrect;
}

function saveScore(newEntry) {
  const scores = loadScores();
  const sanitizedPlayer = String(newEntry.player || "Anónimo")
    .trim()
    .replace(/[<>&"']/g, "")
    .substring(0, 24) || "Anónimo";

  const rawCourse = String(newEntry.course || "").trim();
  let selectedCourse = "1º SMR";
  if (rawCourse.includes("2") && rawCourse.toUpperCase().includes("ASIR")) {
    selectedCourse = "2º ASIR";
  } else if (rawCourse.includes("1") && rawCourse.toUpperCase().includes("ASIR")) {
    selectedCourse = "1º ASIR";
  } else if (rawCourse.toUpperCase().includes("SMR")) {
    selectedCourse = "1º SMR";
  }

  const entry = {
    player: sanitizedPlayer,
    course: selectedCourse,
    correct: Number(newEntry.correct) || 0,
    incorrect: Number(newEntry.incorrect) || 0,
    timeElapsed: Number(newEntry.timeElapsed) || 0,
    totalQuestions: Number(newEntry.totalQuestions) || 27,
    date: new Date().toISOString()
  };

  // Cada nombre solo puede aparecer 1 vez en el ranking (se conserva su puntuación más alta)
  const existingIdx = scores.findIndex(
    s => s.player.toLowerCase() === sanitizedPlayer.toLowerCase()
  );

  let updated = false;

  if (existingIdx !== -1) {
    const existing = scores[existingIdx];
    if (isBetterScore(entry, existing)) {
      scores[existingIdx] = entry;
      updated = true;
    } else {
      updated = false;
    }
  } else {
    scores.push(entry);
    updated = true;
  }

  scores.sort((a, b) => {
    if (b.correct !== a.correct) return b.correct - a.correct;
    return a.timeElapsed - b.timeElapsed;
  });

  // Guardar hasta los 100 mejores registros únicos
  const trimmed = scores.slice(0, 100);
  fs.writeFileSync(SCORES_FILE, JSON.stringify(trimmed, null, 2), "utf8");
  return { scores: trimmed, updated };
}

const server = http.createServer((req, res) => {
  // Cabeceras CORS para acceso en red
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = reqUrl.pathname;

  // Endpoint API: Obtener puntuaciones
  if (req.method === "GET" && pathname === "/api/scores") {
    const scores = loadScores();
    res.writeHead(200, { "Content-Type": "application/json; charset=UTF-8" });
    res.end(JSON.stringify(scores));
    return;
  }

  // Endpoint API: Guardar puntuación (actualiza sólo si supera el récord personal previo)
  if (req.method === "POST" && pathname === "/api/scores") {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1e5) req.destroy(); // Limitar tamaño de payload
    });
    req.on("end", () => {
      try {
        const payload = JSON.parse(body);
        const result = saveScore(payload);
        res.writeHead(201, { "Content-Type": "application/json; charset=UTF-8" });
        res.end(JSON.stringify({ success: true, updated: result.updated, scores: result.scores }));
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json; charset=UTF-8" });
        res.end(JSON.stringify({ error: "JSON inválido" }));
      }
    });
    return;
  }

  // Servir archivos estáticos
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, "");
  if (safePath === "/" || safePath === "\\") safePath = "/index.html";

  const fullPath = path.join(__dirname, safePath);

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=UTF-8" });
      res.end("404 - Archivo no encontrado");
      return;
    }

    const mime = getMimeType(fullPath);
    res.writeHead(200, { "Content-Type": mime });
    const stream = fs.createReadStream(fullPath);
    stream.pipe(res);
  });
});

// Obtener IPs locales de la máquina
function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        addresses.push({ name, address: iface.address });
      }
    }
  }
  return addresses;
}

server.listen(PORT, "0.0.0.0", () => {
  const ips = getLocalIpAddresses();
  console.log("============================================================");
  console.log("🎃  PASAPALABRA INFORMÁTICO - EDICIÓN HALLOWEEN  🎃");
  console.log("============================================================");
  console.log(`➜ Servidor local:      http://localhost:${PORT}`);
  if (ips.length > 0) {
    console.log("➜ Acceso en Red Local (comparte este enlace con tus amigos):");
    ips.forEach(ip => {
      console.log(`   • http://${ip.address}:${PORT}  (${ip.name})`);
    });
  } else {
    console.log(`➜ Acceso en red:       http://0.0.0.0:${PORT}`);
  }
  console.log("------------------------------------------------------------");
  console.log("Las puntuaciones se guardan automáticamente en 'scores.json'.");
  console.log("Pulsa Ctrl + C para detener el servidor.");
  console.log("============================================================\n");
});

