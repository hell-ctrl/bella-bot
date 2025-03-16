const fs = require("fs");
const path = require("path");
const { handleGroupParticipantsUpdate } = require("../utils/groupMetaData");

const filePath = path.join(__dirname, "../database/groups.json");
let groupsData = JSON.parse(fs.readFileSync(filePath));

//para evitar que o arquivo de grupos seja carregado toda hora
fs.watchFile(filePath, () => {
  groupsData = JSON.parse(fs.readFileSync(filePath));
});

async function groupParticipantsUpdate(sock, update) {
  await handleGroupParticipantsUpdate(sock, update);

  if (update.action === "add") {
    const groupData = groupsData.find((group) => group.id == update.id);

    if (!groupData || !groupData["bem-vindo"]) return;

    try {
      await sock.sendMessage(update.id, {
        text: `Bem-vindo(a) ao grupo, @${update.participants[0].split("@")[0]}!`,
        contextInfo: {
          forwardingScore: 50000,
          isForwarded: true,
          remoteJid: update.id,
          mentionedJid: [update.participants[0]],
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = groupParticipantsUpdate;
