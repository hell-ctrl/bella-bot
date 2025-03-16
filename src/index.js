const connectToWhatsApp = require("./connection");
const connectionUpdate = require("./events/connectionUpdate");
const messagesUpdate = require("./events/messagesUpdate");
const messagesUpsert = require("./events/messagesUpsert");
const groupParticipantsUpdate = require("./events/groupParticipantsUpdate");

async function start() {
  const sock = await connectToWhatsApp();

  sock.ev.on("connection.update", update => connectionUpdate(update, start));
  sock.ev.on("messages.upsert", message => messagesUpsert(sock, message));
  sock.ev.on("messages.update", message => messagesUpdate(sock, message));
  sock.ev.on("group-participants.update", update => groupParticipantsUpdate(sock, update));
}

start();