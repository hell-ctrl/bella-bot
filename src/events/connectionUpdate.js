const { DisconnectReason } = require("baileys");
const clc = require("cli-color");

async function connectionUpdate(update, start) {
  const { connection, lastDisconnect } = update;

  if (connection === "close") {
    const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
    if (shouldReconnect) {
      start();
    }
  } else if (connection === "open") {
    
    console.log(`${clc.red("➜")} ${clc.yellowBright("conectado ao bot.\n")}`);
  };
};

module.exports = connectionUpdate;