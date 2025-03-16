const { default: makeWASocket, Browsers, fetchLatestBaileysVersion, useMultiFileAuthState } = require("baileys");
const pino = require("pino");
const readline = require("readline");
const clc = require("cli-color");
const banner = require("../utils/banner");

console.clear();
console.log(banner.string);

//para evitar logs indesejados no terminal.
console.debug = console.info = console.warn = function () {};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

async function connectToWhatsApp() {
  let { state, saveCreds } = await useMultiFileAuthState("./src/connection/auth");
  let { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: pino({level: "silent"}),
    auth: state,
    printQRInTerminal: false,
    mobile: false,
    browser: Browsers.ubuntu("Firefox"),
  });

  if (!sock.authState.creds.registered) {
    const phoneNumber = await question(`Digite seu número do WhatsApp:\nEx: ${clc.bold("559885512460")}\n/> `);
    const code = await sock.requestPairingCode(phoneNumber);
    console.log(`Seu código de conexão é: ${clc.bold(code)}\n`);
    console.log(`Abra seu WhatsApp, vá em ${clc.bold("Aparelhos Conectados > Conectar um novo Aparelho > Conectar usando Número.")}`);

    rl.close()
  };

  sock.ev.on("creds.update", saveCreds);

  return sock;
}

module.exports = connectToWhatsApp;
