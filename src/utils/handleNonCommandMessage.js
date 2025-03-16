const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../database/groups.json");
let groupsData = JSON.parse(fs.readFileSync(filePath));

//para evitar que o arquivo de grupos seja carregado toda hora
fs.watchFile(filePath, () => {
  groupsData = JSON.parse(fs.readFileSync(filePath));
});

async function handleNonCommandMessage({
  sock,
  textOfMessage,
  senderIsAdm,
  botIsAdm,
  chatId,
  key,
  isGroup,
  reply,
}) {
  if (isGroup) {
    const groupData = groupsData.find((group) => group.id == chatId);

    if (!groupData || !groupData["anti-link"]) return;

    const isLink = /(https?|ftp):\/\/[^\s]+/g.test(textOfMessage);

    if (isLink && !key.fromMe && !senderIsAdm && botIsAdm) {
      await sock.sendMessage(chatId, { delete: key });
      reply("Links não são permitidos neste grupo!");
    }
  }
}

module.exports = handleNonCommandMessage;
