const { messagesCache } = require("../settings/cache");
const { getFileBufferFromWhatsapp, getMediaMessageContent } = require("../utils/media");
const { getTypeMessage, getTextOfMessage } = require("../utils/message");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../database/groups.json");
let groupsData = JSON.parse(fs.readFileSync(filePath));

//para evitar que o arquivo de grupos seja carregado toda hora
fs.watchFile(filePath, () => {
  groupsData = JSON.parse(fs.readFileSync(filePath));
});

async function messagesUpdate(sock, message) {
  const messageInfo = message[0];

  const groupData = groupsData.find(group => group.id == messageInfo.key.remoteJid);

  if (messageInfo.update.messageStubType == 1 && groupData?.revelar && !messageInfo.key.fromMe) {
    const cachedData = messagesCache.get(messageInfo.key.id);

    if (!cachedData) return;

    const messageRecovered = JSON.parse(cachedData);

    if(messageRecovered.key.fromMe) return;

    const messageType = getTypeMessage(messageRecovered);
    const jid = messageRecovered.key.remoteJid;
    const text = getTextOfMessage(messageRecovered);

    const quoted = {
       key: messageRecovered.key,
       message: { conversation: "eu apaguei essa mensagem aqui 👇"}
    }

    try {
      let content = {};

      if (messageType === "text") {
        content = { text };
      } else {
        const buffer = await getFileBufferFromWhatsapp(getMediaMessageContent(messageRecovered), messageType);
        content = { [messageType]: buffer, caption: text };
      }

      await sock.sendMessage(jid, content, { quoted });
    } catch (error) {
      console.error(error.message);
    }
    messagesCache.del(messageInfo.key.id);
  }
}

module.exports = messagesUpdate;
