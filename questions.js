// Base de datos de preguntas de informática (Nivel Intermedio)
// Cada letra dispone de entre 5 y 6 preguntas técnicas diferentes para máxima rejugabilidad.

const QUESTION_BANK = {
  A: [
    {
      type: "starts",
      question: "Interfaz de programación que permite la comunicación e intercambio de datos estructurados entre dos sistemas de software independientes.",
      answer: "API",
      aliases: ["api", "interfaz de programacion de aplicaciones"]
    },
    {
      type: "starts",
      question: "Secuencia finita, ordenada e inequívoca de instrucciones lógicas para resolver un problema computacional determinado.",
      answer: "Algoritmo",
      aliases: ["algoritmo"]
    },
    {
      type: "starts",
      question: "Modelo de comunicación o ejecución donde una tarea no bloquea el hilo principal mientras espera una respuesta de entrada/salida.",
      answer: "Asíncrono",
      aliases: ["asincrono", "asincrona", "asincronismo"]
    },
    {
      type: "starts",
      question: "Estructura de datos jerárquica no lineal compuesta por nodos conectados mediante ramas, que comienza en un nodo raíz.",
      answer: "Árbol",
      aliases: ["arbol", "tree"]
    },
    {
      type: "starts",
      question: "Estructura de datos lineal que almacena una colección contigua de elementos del mismo tipo accesibles mediante un índice numérico.",
      answer: "Array",
      aliases: ["array", "arreglo", "vector"]
    },
    {
      type: "starts",
      question: "Proceso informático de verificar y certificar la identidad declarada por un usuario, proceso o dispositivo en el sistema.",
      answer: "Autenticación",
      aliases: ["autenticacion", "autenticacion de usuarios", "authentication"]
    }
  ],
  B: [
    {
      type: "starts",
      question: "Capa de una aplicación web encargada de la lógica de negocio, acceso a bases de datos, APIs y autenticación en el servidor.",
      answer: "Backend",
      aliases: ["backend", "back-end", "back end"]
    },
    {
      type: "starts",
      question: "Espacio de memoria temporal utilizado para almacenar datos mientras se transfieren entre dos dispositivos o procesos con diferente velocidad.",
      answer: "Buffer",
      aliases: ["buffer"]
    },
    {
      type: "starts",
      question: "Unidad mínima fundamental de información en computación digital que representa un valor binario (0 o 1).",
      answer: "Bit",
      aliases: ["bit"]
    },
    {
      type: "starts",
      question: "Unidad básica de almacenamiento en sistemas informáticos compuesta habitualmente por un grupo ordenado de 8 bits.",
      answer: "Byte",
      aliases: ["byte", "octeto"]
    },
    {
      type: "starts",
      question: "Conjunto estructurado y organizado de datos almacenados electrónicamente en un sistema informático para su consulta y actualización.",
      answer: "Base de datos",
      aliases: ["base de datos", "database", "bbdd", "bd"]
    },
    {
      type: "starts",
      question: "Copia de respaldo duplicada de información digital generada con fines de recuperación ante posibles desastres o pérdidas.",
      answer: "Backup",
      aliases: ["backup", "copia de seguridad", "copia de respaldo"]
    }
  ],
  C: [
    {
      type: "starts",
      question: "Memoria de acceso ultrarrápido que almacena temporalmente datos consultados con frecuencia para reducir tiempos de respuesta.",
      answer: "Caché",
      aliases: ["cache", "memoria cache"]
    },
    {
      type: "starts",
      question: "Herramienta que traduce código fuente escrito en un lenguaje de alto nivel a código máquina ejecutable o binario.",
      answer: "Compilador",
      aliases: ["compilador"]
    },
    {
      type: "starts",
      question: "En sistemas de control de versiones como Git, acción de consolidar y registrar de forma permanente un conjunto de cambios en el historial.",
      answer: "Commit",
      aliases: ["commit"]
    },
    {
      type: "starts",
      question: "Pequeño fragmento de datos que un servidor envía al navegador web del usuario para recordar estado, sesión o preferencias.",
      answer: "Cookie",
      aliases: ["cookie", "cookies"]
    },
    {
      type: "starts",
      question: "Disciplina matemática e informática dedicada a proteger información mediante cifrado y técnicas de integridad y firma digital.",
      answer: "Criptografía",
      aliases: ["criptografia", "cryptography"]
    },
    {
      type: "starts",
      question: "Unidad central de procesamiento o procesador principal encargado de interpretar y ejecutar la mayor parte de las instrucciones en un ordenador.",
      answer: "CPU",
      aliases: ["cpu", "procesador"]
    }
  ],
  D: [
    {
      type: "starts",
      question: "Sistema jerárquico y distribuido que traduce nombres de dominio legibles por personas a direcciones IP numéricas.",
      answer: "DNS",
      aliases: ["dns", "domain name system"]
    },
    {
      type: "starts",
      question: "Plataforma de virtualización a nivel de sistema operativo basada en contenedores ligeros, portables y aislados.",
      answer: "Docker",
      aliases: ["docker"]
    },
    {
      type: "starts",
      question: "Situación de bloqueo mutuo en concurrencia donde dos o más procesos esperan eternamente recursos retenidos por el otro.",
      answer: "Deadlock",
      aliases: ["deadlock", "bloqueo mutuo", "interbloqueo"]
    },
    {
      type: "starts",
      question: "Herramienta o utilidad de programación empleada para inspeccionar variables, fijar puntos de interrupción y depurar errores en código fuente.",
      answer: "Debugger",
      aliases: ["debugger", "depurador"]
    },
    {
      type: "starts",
      question: "Controlador de dispositivo o software de bajo nivel que permite al sistema operativo interactuar directamente con un componente de hardware.",
      answer: "Driver",
      aliases: ["driver", "controlador"]
    },
    {
      type: "starts",
      question: "Representación estructural estándar en forma de árbol que los navegadores web crean en memoria a partir de un documento HTML.",
      answer: "DOM",
      aliases: ["dom", "document object model"]
    }
  ],
  E: [
    {
      type: "starts",
      question: "Estándar de comunicación por cable más extendido en redes de área local (LAN) según la norma IEEE 802.3.",
      answer: "Ethernet",
      aliases: ["ethernet"]
    },
    {
      type: "starts",
      question: "Proceso de transformar información legible en un formato incomprensible mediante un algoritmo y una clave criptográfica.",
      answer: "Encriptación",
      aliases: ["encriptacion", "cifrado", "encriptado"]
    },
    {
      type: "starts",
      question: "Evento anómalo que interrumpe el flujo secuencial ordinario de instrucciones de un programa durante su ejecución.",
      answer: "Excepción",
      aliases: ["excepcion", "exception"]
    },
    {
      type: "starts",
      question: "Punto de acceso específico o URL expuesta por un servicio web donde se reciben y procesan peticiones de clientes de una API.",
      answer: "Endpoint",
      aliases: ["endpoint", "end point"]
    },
    {
      type: "starts",
      question: "Capacidad de un sistema informático, red o aplicación para adaptarse y gestionar un incremento sustancial en la carga de trabajo sin degradar su rendimiento.",
      answer: "Escalabilidad",
      aliases: ["escalabilidad", "scalability"]
    },
    {
      type: "starts",
      question: "Proceso de reenviar paquetes de red a través de distintas rutas e interfaces para alcanzar su destino en Internet o en una LAN.",
      answer: "Enrutamiento",
      aliases: ["enrutamiento", "routing"]
    }
  ],
  F: [
    {
      type: "starts",
      question: "Sistema de seguridad que monitorea y filtra el tráfico de red entrante y saliente según directivas y reglas predefinidas.",
      answer: "Firewall",
      aliases: ["firewall", "cortafuegos"]
    },
    {
      type: "starts",
      question: "Parte de una aplicación web o móvil con la que el usuario interactúa visual y funcionalmente en el cliente.",
      answer: "Frontend",
      aliases: ["frontend", "front-end", "front end"]
    },
    {
      type: "starts",
      question: "Estructura conceptual o conjunto estandarizado de librerías y componentes que sirve de base para el desarrollo ágil de software.",
      answer: "Framework",
      aliases: ["framework"]
    },
    {
      type: "starts",
      question: "Software de bajo nivel incrustado de forma permanente en la memoria no volátil de un hardware para controlar sus funciones más básicas.",
      answer: "Firmware",
      aliases: ["firmware"]
    },
    {
      type: "starts",
      question: "En sistemas operativos o en GitHub, creación de una copia o bifurcación independiente de un proceso o repositorio para desarrollar mejoras por separado.",
      answer: "Fork",
      aliases: ["fork", "bifurcacion"]
    },
    {
      type: "starts",
      question: "Medio de transmisión físico consistente en hilos transparentes de vidrio o plástico que transmiten datos a alta velocidad mediante pulsos de luz.",
      answer: "Fibra óptica",
      aliases: ["fibra optica", "fibra"]
    }
  ],
  G: [
    {
      type: "starts",
      question: "Sistema de control de versiones distribuido creado por Linus Torvalds, referente estándar de la industria del software.",
      answer: "Git",
      aliases: ["git"]
    },
    {
      type: "starts",
      question: "Dispositivo o nodo de red que conecta dos redes con diferentes protocolos o arquitecturas para que puedan comunicarse.",
      answer: "Gateway",
      aliases: ["gateway", "puerta de enlace"]
    },
    {
      type: "starts",
      question: "Mecanismo automático en runtimes como JVM o V8 encargado de recuperar memoria dinámica ocupada por objetos inalcanzables.",
      answer: "Garbage Collector",
      aliases: ["garbage collector", "recolector de basura", "recolector"]
    },
    {
      type: "starts",
      question: "Unidad de procesamiento gráfico especializada en operaciones matemáticas en paralelo masivo, ampliamente utilizada en renderizado e inteligencia artificial.",
      answer: "GPU",
      aliases: ["gpu", "tarjeta grafica"]
    },
    {
      type: "starts",
      question: "Unidad de velocidad de transferencia de datos de red equivalente a 1000 millones de bits por segundo.",
      answer: "Gigabit",
      aliases: ["gigabit", "gbps"]
    }
  ],
  H: [
    {
      type: "starts",
      question: "Función matemática unidireccional que convierte datos de longitud variable en una cadena alfanumérica de tamaño fijo y determinista.",
      answer: "Hash",
      aliases: ["hash", "funcion hash", "hashing"]
    },
    {
      type: "starts",
      question: "Cualquier computadora o dispositivo informático conectado a una red que provee o consume servicios y dispone de dirección IP.",
      answer: "Host",
      aliases: ["host", "anfitrion"]
    },
    {
      type: "starts",
      question: "Lenguaje de marcado estándar utilizado para definir la semántica y estructura de los documentos en la web.",
      answer: "HTML",
      aliases: ["html", "html5"]
    },
    {
      type: "starts",
      question: "Protocolo de nivel de aplicación sin estado que sustenta la transferencia y visualización de recursos hipertexto en la World Wide Web.",
      answer: "HTTP",
      aliases: ["http", "https"]
    },
    {
      type: "starts",
      question: "Conjunto de elementos materiales, circuitos integrados, cables y periféricos físicos que integran un sistema informático.",
      answer: "Hardware",
      aliases: ["hardware"]
    },
    {
      type: "starts",
      question: "Área de memoria dinámica gestionada por el runtime en tiempo de ejecución para la asignación y liberación de objetos variables.",
      answer: "Heap",
      aliases: ["heap", "monticulo"]
    }
  ],
  I: [
    {
      type: "starts",
      question: "Protocolo de red no orientado a conexión responsable de enrutar y direccionar paquetes a través de fronteras de red.",
      answer: "IP",
      aliases: ["ip", "internet protocol"]
    },
    {
      type: "starts",
      question: "Entorno de desarrollo que combina editor de código, depurador, herramientas de construcción y completado inteligente en una única interfaz.",
      answer: "IDE",
      aliases: ["ide", "entorno de desarrollo integrado"]
    },
    {
      type: "starts",
      question: "Clase de vulnerabilidad de seguridad en la que un atacante introduce código malicioso en entradas no saneadas (ej: SQL o comandos).",
      answer: "Inyección",
      aliases: ["inyeccion", "injection"]
    },
    {
      type: "starts",
      question: "Paradigma tecnológico que interconecta objetos físicos cotidianos dotados de sensores, software y conectividad a Internet.",
      answer: "IoT",
      aliases: ["iot", "internet de las cosas"]
    },
    {
      type: "starts",
      question: "Versión moderna del protocolo IP que utiliza direcciones hexadecimales de 128 bits para solventar el agotamiento de direcciones de IPv4.",
      answer: "IPv6",
      aliases: ["ipv6"]
    },
    {
      type: "starts",
      question: "Estructura de datos auxiliar en bases de datos que optimiza y acelera drásticamente la búsqueda y recuperación de registros en una tabla.",
      answer: "Índice",
      aliases: ["indice", "index"]
    }
  ],
  J: [
    {
      type: "starts",
      question: "Formato ligero de serialización e intercambio de datos basado en texto y compuesto por pares clave-valor y matrices.",
      answer: "JSON",
      aliases: ["json"]
    },
    {
      type: "starts",
      question: "Estándar compacto y autónomo para transmitir de forma segura información de autenticación y reclamos entre partes en formato JSON codificado.",
      answer: "JWT",
      aliases: ["jwt", "json web token"]
    },
    {
      type: "starts",
      question: "Lenguaje de programación orientado a objetos, fuertemente tipado, cuya portabilidad se fundamenta en su máquina virtual de bytecode.",
      answer: "Java",
      aliases: ["java"]
    },
    {
      type: "starts",
      question: "Lenguaje de programación interpretado y orientado a objetos, dominante e imprescindible para la interacción dinámica en los navegadores web.",
      answer: "JavaScript",
      aliases: ["javascript", "js"]
    },
    {
      type: "starts",
      question: "Servidor de automatización de código abierto ampliamente utilizado para construir pipelines de integración continua y despliegue continuo (CI/CD).",
      answer: "Jenkins",
      aliases: ["jenkins"]
    }
  ],
  K: [
    {
      type: "starts",
      question: "Componente central y nuclear del sistema operativo con control total y privilegios sobre CPU, memoria y periféricos.",
      answer: "Kernel",
      aliases: ["kernel", "nucleo"]
    },
    {
      type: "starts",
      question: "Sistema open source creado originalmente por Google para la orquestación, despliegue, balanceo y escalado de contenedores.",
      answer: "Kubernetes",
      aliases: ["kubernetes", "k8s"]
    },
    {
      type: "starts",
      question: "En bases de datos y criptografía, elemento que identifica de manera unívoca un registro o parámetro usado para cifrar/descifrar.",
      answer: "Key",
      aliases: ["key", "clave", "llave"]
    },
    {
      type: "starts",
      question: "Plataforma distribuida de mensajería y streaming de eventos de alto rendimiento desarrollada bajo el paraguas de Apache.",
      answer: "Kafka",
      aliases: ["kafka", "apache kafka"]
    },
    {
      type: "starts",
      question: "Tipo de malware o software espía diseñado específicamente para registrar de manera encubierta cada pulsación de teclado del usuario.",
      answer: "Keylogger",
      aliases: ["keylogger"]
    }
  ],
  L: [
    {
      type: "starts",
      question: "Retardo temporal que experimenta un paquete de datos desde que es emitido por el origen hasta que llega a su destino en la red.",
      answer: "Latencia",
      aliases: ["latencia", "latency"]
    },
    {
      type: "starts",
      question: "Núcleo de sistema operativo monolítico, libre y compatible con POSIX, concebido inicialmente en 1991.",
      answer: "Linux",
      aliases: ["linux"]
    },
    {
      type: "starts",
      question: "Estructura de control iterativa que repite un bloque de sentencias mientras una condición lógica permanezca verdadera.",
      answer: "Loop",
      aliases: ["loop", "bucle", "ciclo"]
    },
    {
      type: "starts",
      question: "Red informática que interconecta equipos dentro de un ámbito geográfico limitado, como una oficina, laboratorio o vivienda.",
      answer: "LAN",
      aliases: ["lan", "red de area local", "local area network"]
    },
    {
      type: "starts",
      question: "Registro cronológico de eventos, peticiones o errores generado por el sistema operativo o aplicaciones para auditoría y depuración.",
      answer: "Log",
      aliases: ["log", "logs", "archivo de registro"]
    },
    {
      type: "starts",
      question: "Colección reutilizable de funciones, clases y módulos de código que un programa puede importar para evitar reinventar la rueda.",
      answer: "Librería",
      aliases: ["libreria", "biblioteca", "library"]
    }
  ],
  M: [
    {
      type: "starts",
      question: "Categoría amplia de software hostil o intrusivo concebido para dañar, espiar o tomar control no autorizado de un sistema.",
      answer: "Malware",
      aliases: ["malware"]
    },
    {
      type: "starts",
      question: "Software que asiste como intermediario gestionando peticiones, autenticación o transformaciones entre clientes y servicios web.",
      answer: "Middleware",
      aliases: ["middleware"]
    },
    {
      type: "starts",
      question: "Primitiva de sincronización en programación concurrente que garantiza que solo un hilo acceda a una sección crítica a la vez.",
      answer: "Mutex",
      aliases: ["mutex", "exclusion mutua"]
    },
    {
      type: "starts",
      question: "Patrón de arquitectura de software que descompone una aplicación grande en múltiples servicios pequeños, autónomos e independientes.",
      answer: "Microservicios",
      aliases: ["microservicios", "microservicio", "microservices"]
    },
    {
      type: "starts",
      question: "Dispositivo electrónico que modula y demodula señales analógicas en digitales para posibilitar la conexión a Internet por línea física.",
      answer: "Módem",
      aliases: ["modem"]
    }
  ],
  N: [
    {
      type: "starts",
      question: "Punto de conexión individual, host o elemento activo dentro de una topología de red o estructura de árbol.",
      answer: "Nodo",
      aliases: ["nodo", "node"]
    },
    {
      type: "starts",
      question: "Valor o literal en programación que denota la ausencia intencionada de objeto, dirección o referencia válida.",
      answer: "Null",
      aliases: ["null", "nulo", "nil"]
    },
    {
      type: "starts",
      question: "Servidor web asíncrono y proxy inverso de alto rendimiento muy extendido para servir contenido estático y balancear carga.",
      answer: "Nginx",
      aliases: ["nginx"]
    },
    {
      type: "starts",
      question: "Modelo de prestación de servicios computacionales donde servidores, almacenamiento y software se acceden bajo demanda a través de Internet.",
      answer: "Nube",
      aliases: ["nube", "cloud", "cloud computing"]
    },
    {
      type: "starts",
      question: "Técnica de traducción de direcciones de red que permite a múltiples dispositivos en una red privada compartir una única dirección IP pública.",
      answer: "NAT",
      aliases: ["nat", "network address translation"]
    }
  ],
  Ñ: [
    {
      type: "contains",
      question: "Cadena de caracteres secreta que un usuario presenta para verificar su identidad en un mecanismo de autenticación.",
      answer: "Contraseña",
      aliases: ["contraseña", "contrasena", "password"]
    },
    {
      type: "contains",
      question: "Magnitud que describe la cantidad de memoria o almacenamiento en bytes que ocupa una estructura o fichero en disco.",
      answer: "Tamaño",
      aliases: ["tamaño", "tamano", "size"]
    },
    {
      type: "contains",
      question: "Condición en la que un sector de disco o fichero presenta corrupción de datos y es ilegible por el sistema operativo.",
      answer: "Dañado",
      aliases: ["dañado", "danado", "corrupto"]
    },
    {
      type: "contains",
      question: "Elemento visual de interfaz que permite mantener abiertos múltiples documentos o páginas web en una única ventana de navegador.",
      answer: "Pestaña",
      aliases: ["pestaña", "pestana", "tab"]
    },
    {
      type: "contains",
      question: "Notificación o interrupción enviada a un proceso en sistemas tipo Unix para avisarle de un suceso asíncrono (ej: SIGINT, SIGKILL).",
      answer: "Señal",
      aliases: ["señal", "senal", "signal"]
    }
  ],
  O: [
    {
      type: "starts",
      question: "Modelo de distribución de software en el cual el código fuente está disponible públicamente para su estudio, mejora y redistribución.",
      answer: "Open Source",
      aliases: ["open source", "opensource", "codigo abierto"]
    },
    {
      type: "starts",
      question: "Entidad en memoria que encapsula estado (atributos) y comportamiento (métodos), instanciada a partir de una clase.",
      answer: "Objeto",
      aliases: ["objeto", "object"]
    },
    {
      type: "starts",
      question: "Técnica que consiste en forzar a un procesador a operar a una frecuencia de ciclo superior a la nominal del fabricante.",
      answer: "Overclock",
      aliases: ["overclock", "overclocking"]
    },
    {
      type: "starts",
      question: "En una expresión matemática o instrucción de código máquina, valor o dato sobre el cual actúa un operador.",
      answer: "Operando",
      aliases: ["operando", "operand"]
    },
    {
      type: "starts",
      question: "Error producido cuando el resultado de un cálculo aritmético o el contenido de memoria excede la capacidad del contenedor asignado.",
      answer: "Overflow",
      aliases: ["overflow", "desbordamiento", "buffer overflow"]
    }
  ],
  P: [
    {
      type: "starts",
      question: "Característica de la programación orientada a objetos donde métodos de distintas clases comparten la misma firma pero diferente implementación.",
      answer: "Polimorfismo",
      aliases: ["polimorfismo", "polymorphism"]
    },
    {
      type: "starts",
      question: "Conjunto formalizado de reglas y convenciones sintácticas y semánticas que rigen la transmisión de datos entre dispositivos de red.",
      answer: "Protocolo",
      aliases: ["protocolo", "protocol"]
    },
    {
      type: "starts",
      question: "Herramienta de diagnóstico que envía paquetes ICMP Echo Request a un host para comprobar si está accesible y medir el RTT.",
      answer: "Ping",
      aliases: ["ping"]
    },
    {
      type: "starts",
      question: "Variable en lenguajes como C o C++ cuyo valor almacenado es la dirección física de memoria de otra variable.",
      answer: "Puntero",
      aliases: ["puntero", "pointer"]
    },
    {
      type: "starts",
      question: "Servidor intermediario que intercepta peticiones entre clientes y servidores destino, utilizado para anonimato, filtrado o almacenamiento en caché.",
      answer: "Proxy",
      aliases: ["proxy", "servidor proxy"]
    },
    {
      type: "starts",
      question: "Técnica de ingeniería social en la que atacantes suplantan entidades legítimas (bancos, empresas) para sustraer credenciales bancarias o contraseñas.",
      answer: "Phishing",
      aliases: ["phishing"]
    }
  ],
  Q: [
    {
      type: "starts",
      question: "Instrucción o petición formal de consulta y manipulación de datos enviada a un motor de base de datos relacional o no relacional.",
      answer: "Query",
      aliases: ["query", "consulta"]
    },
    {
      type: "starts",
      question: "Estructura de datos lineal que opera bajo el principio FIFO (First In, First Out), donde el primer elemento en entrar es el primero en salir.",
      answer: "Queue",
      aliases: ["queue", "cola"]
    },
    {
      type: "starts",
      question: "Algoritmo de ordenación eficiente basado en la estrategia de divide y vencerás que divide el arreglo alrededor de un pivote.",
      answer: "QuickSort",
      aliases: ["quicksort", "ordenamiento rapido"]
    },
    {
      type: "starts",
      question: "Unidad fundamental y mínima de información en la computación cuántica, capaz de encontrarse en estados de superposición cuántica.",
      answer: "Qubit",
      aliases: ["qubit", "bit cuantico"]
    },
    {
      type: "starts",
      question: "Parte final de una URL que contiene parámetros adicionales enviados tras el símbolo de interrogación (ej: ?categoria=libros&orden=asc).",
      answer: "Query String",
      aliases: ["query string", "querystring"]
    }
  ],
  R: [
    {
      type: "starts",
      question: "Técnica en la que una función se invoca a sí misma para resolver subproblemas idénticos hasta alcanzar un caso base.",
      answer: "Recursión",
      aliases: ["recursion", "recursividad"]
    },
    {
      type: "starts",
      question: "Dispositivo de red de capa 3 que analiza las cabeceras de paquetes para elegir la mejor ruta de reenvío entre subredes.",
      answer: "Router",
      aliases: ["router", "enrutador"]
    },
    {
      type: "starts",
      question: "Memoria principal volátil de alta velocidad empleada por el procesador para almacenar programas y datos en ejecución activa.",
      answer: "RAM",
      aliases: ["ram", "memoria ram"]
    },
    {
      type: "starts",
      question: "Tipo de malware extorsivo que secuestra y cifra los ficheros de una víctima exigiendo un rescate económico para su descifrado.",
      answer: "Ransomware",
      aliases: ["ransomware"]
    },
    {
      type: "starts",
      question: "Espacio de almacenamiento digital centralizado o distribuido donde se organizan los archivos de un proyecto junto a su historial de versiones.",
      answer: "Repositorio",
      aliases: ["repositorio", "repo"]
    }
  ],
  S: [
    {
      type: "starts",
      question: "Lenguaje declarativo estándar empleado para consultar, definir y administrar datos en sistemas de bases de datos relacionales.",
      answer: "SQL",
      aliases: ["sql", "structured query language"]
    },
    {
      type: "starts",
      question: "Punto final de comunicación de red bidireccional constituido por la combinación de una dirección IP y un número de puerto.",
      answer: "Socket",
      aliases: ["socket"]
    },
    {
      type: "starts",
      question: "Protocolo criptográfico de red que posibilita sesiones de terminal seguras y transferencias de archivos en redes no confiables.",
      answer: "SSH",
      aliases: ["ssh", "secure shell"]
    },
    {
      type: "starts",
      question: "Computadora o programa que provee recursos, datos, servicios o funcionalidades a otros dispositivos denominados clientes.",
      answer: "Servidor",
      aliases: ["servidor", "server"]
    },
    {
      type: "starts",
      question: "Programa informático habitualmente interpretado y de estructura ligera que automatiza una serie secuencial de comandos.",
      answer: "Script",
      aliases: ["script", "guion"]
    },
    {
      type: "starts",
      question: "Dispositivo de interconexión de capa de enlace (capa 2) que reenvía tramas de datos hacia el puerto destino según su dirección MAC.",
      answer: "Switch",
      aliases: ["switch", "conmutador"]
    }
  ],
  T: [
    {
      type: "starts",
      question: "Cadena criptográfica o pase digital que acredita la identidad y permisos de acceso de un cliente tras autenticarse.",
      answer: "Token",
      aliases: ["token"]
    },
    {
      type: "starts",
      question: "Protocolo de transporte orientado a conexión que garantiza la entrega secuencial, sin pérdidas ni duplicados, de un flujo de bytes.",
      answer: "TCP",
      aliases: ["tcp", "transmission control protocol"]
    },
    {
      type: "starts",
      question: "Unidad básica más pequeña de ejecución concurrente que puede ser planificada por el sistema operativo dentro de un mismo proceso.",
      answer: "Thread",
      aliases: ["thread", "hilo", "hebra"]
    },
    {
      type: "starts",
      question: "Tipo de malware camuflado bajo la apariencia de software legítimo y útil para engañar al usuario y abrir una puerta trasera en su sistema.",
      answer: "Troyano",
      aliases: ["troyano", "trojan"]
    },
    {
      type: "starts",
      question: "Tiempo límite fijado para que una operación de red o proceso se complete antes de ser cancelada por inactividad.",
      answer: "Timeout",
      aliases: ["timeout", "tiempo de espera"]
    },
    {
      type: "starts",
      question: "Secuencia indivisible de operaciones en una base de datos que debe ejecutarse completamente o deshacerse en caso de fallo (principio ACID).",
      answer: "Transacción",
      aliases: ["transaccion", "transaction"]
    }
  ],
  U: [
    {
      type: "starts",
      question: "Estándar industrial internacional de codificación de caracteres ideado para representar sistemáticamente textos de cualquier idioma o símbolo.",
      answer: "Unicode",
      aliases: ["unicode", "utf-8", "utf8"]
    },
    {
      type: "starts",
      question: "Identificador uniforme que indica la dirección web precisa de un recurso disponible en Internet y el protocolo para acceder a él.",
      answer: "URL",
      aliases: ["url", "localizador uniforme de recursos"]
    },
    {
      type: "starts",
      question: "Conjunto de elementos gráficos y controles visuales mediante los cuales un usuario humano interactúa con una aplicación de software.",
      answer: "UI",
      aliases: ["ui", "interfaz de usuario", "user interface"]
    },
    {
      type: "starts",
      question: "Estándar de bus de comunicación y conector físico universalmente utilizado para interconectar periféricos a ordenadores y alimentarlos con energía.",
      answer: "USB",
      aliases: ["usb", "universal serial bus"]
    },
    {
      type: "starts",
      question: "Distribución de Linux de código abierto basada en Debian, muy popular tanto en entornos de escritorio como en servidores cloud.",
      answer: "Ubuntu",
      aliases: ["ubuntu"]
    }
  ],
  V: [
    {
      type: "starts",
      question: "Tecnología de red que establece un túnel cifrado y seguro para canalizar tráfico privado a través de una red pública no confiable.",
      answer: "VPN",
      aliases: ["vpn", "red privada virtual"]
    },
    {
      type: "starts",
      question: "Espacio de memoria identificado con un nombre que almacena un valor mutable durante el tiempo de ejecución de un programa.",
      answer: "Variable",
      aliases: ["variable"]
    },
    {
      type: "starts",
      question: "Tecnología de abstracción que posibilita ejecutar múltiples instancias independientes de sistemas operativos sobre el mismo hardware físico.",
      answer: "Virtualización",
      aliases: ["virtualizacion", "virtualization"]
    },
    {
      type: "starts",
      question: "Fallo, debilidad o fallo de diseño en un sistema de software que puede ser explotado por un atacante para vulnerar la seguridad.",
      answer: "Vulnerabilidad",
      aliases: ["vulnerabilidad", "flaw", "bug de seguridad"]
    },
    {
      type: "starts",
      question: "Programa malicioso que se autoreplica infectando otros programas ejecutables o ficheros del sistema para causar alteraciones.",
      answer: "Virus",
      aliases: ["virus", "virus informatico"]
    }
  ],
  W: [
    {
      type: "starts",
      question: "Mecanismo de comunicación HTTP basado en eventos (HTTP callback) mediante el cual una aplicación notifica a otra automáticamente en tiempo real.",
      answer: "Webhook",
      aliases: ["webhook", "webhooks"]
    },
    {
      type: "starts",
      question: "Protocolo de comunicación bidireccional y full-duplex que mantiene un único socket TCP abierto y persistente entre cliente y servidor.",
      answer: "WebSocket",
      aliases: ["websocket", "ws"]
    },
    {
      type: "starts",
      question: "Tecnología de conectividad inalámbrica de corto y medio alcance estandarizada bajo la familia de normas IEEE 802.11.",
      answer: "WiFi",
      aliases: ["wifi", "wi-fi"]
    },
    {
      type: "starts",
      question: "Tipo de malware (gusano) que se propaga automáticamente a través de la red explotando vulnerabilidades sin requerir la intervención humana.",
      answer: "Worm",
      aliases: ["worm", "gusano", "gusano informatico"]
    },
    {
      type: "starts",
      question: "Boceto o esquema visual preliminar de baja fidelidad que representa la estructura y disposición de elementos de una interfaz web o app.",
      answer: "Wireframe",
      aliases: ["wireframe"]
    }
  ],
  X: [
    {
      type: "starts",
      question: "Lenguaje de marcado extensible basado en etiquetas anidadas, precursor de estándares SOAP y muy empleado en configuración e integración de datos.",
      answer: "XML",
      aliases: ["xml"]
    },
    {
      type: "starts",
      question: "Vulnerabilidad web donde un atacante inyecta scripts de cliente maliciosos en páginas visitadas por usuarios legítimos.",
      answer: "XSS",
      aliases: ["xss", "cross site scripting", "cross-site scripting"]
    },
    {
      type: "contains",
      question: "Familia de sistemas operativos multitarea y multiusuario portables nacidos a finales de los años 60 en Bell Labs.",
      answer: "Unix",
      aliases: ["unix"]
    },
    {
      type: "contains",
      question: "Menor unidad homogénea en color que forma parte de una imagen digital visualizada en una pantalla gráfica.",
      answer: "Pixel",
      aliases: ["pixel", "píxel"]
    },
    {
      type: "contains",
      question: "En sistemas operativos, interfaz de línea de comandos en modo texto utilizada para emitir instrucciones al intérprete de órdenes.",
      answer: "Texto",
      aliases: ["texto", "consola de texto", "modo texto"]
    }
  ],
  Y: [
    {
      type: "starts",
      question: "Formato de serialización de datos orientado a legibilidad humana mediante sangrías, estándar en manifiestos de Kubernetes y Docker Compose.",
      answer: "YAML",
      aliases: ["yaml"]
    },
    {
      type: "starts",
      question: "Gestor de paquetes alternativo para el ecosistema Node.js y JavaScript, desarrollado por Facebook con énfasis en determinismo de instalación.",
      answer: "Yarn",
      aliases: ["yarn"]
    },
    {
      type: "starts",
      question: "Unidad masiva de almacenamiento informático equivalente a 10 elevado a 24 bytes (un cuatrillón de gigabytes).",
      answer: "Yottabyte",
      aliases: ["yottabyte", "yb"]
    },
    {
      type: "starts",
      question: "Palabra clave en lenguajes como Python o JavaScript utilizada dentro de funciones generadoras para pausar la ejecución y devolver un valor intermedio.",
      answer: "Yield",
      aliases: ["yield"]
    }
  ],
  Z: [
    {
      type: "starts",
      question: "Formato de compresión y empaquetamiento de archivos sin pérdida de datos ampliamente soportado en todos los sistemas operativos.",
      answer: "ZIP",
      aliases: ["zip", "archivo zip"]
    },
    {
      type: "starts",
      question: "Proceso informático que ha finalizado su ejecución pero aún permanece en la tabla de procesos debido a que su proceso padre no ha leído su código de salida.",
      answer: "Zombie",
      aliases: ["zombie", "proceso zombie"]
    },
    {
      type: "starts",
      question: "Vulnerabilidad de seguridad de software recién descubierta y explotada públicamente antes de que el proveedor publique una corrección o parche.",
      answer: "Zero-Day",
      aliases: ["zero-day", "zeroday", "zero day", "dia cero"]
    },
    {
      type: "starts",
      question: "Unidad de almacenamiento equivalente a 10 elevado a 21 bytes (aproximadamente mil exabytes).",
      answer: "Zettabyte",
      aliases: ["zettabyte", "zb"]
    },
    {
      type: "starts",
      question: "Propiedad de hojas de estilo CSS que define el orden de apilamiento tridimensional en el eje Z de elementos posicionados.",
      answer: "Z-Index",
      aliases: ["z-index", "zindex"]
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = QUESTION_BANK;
}
