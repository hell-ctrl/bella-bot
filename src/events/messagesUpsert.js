const { getTextOfMessage } = require("../utils/message");
const CommandHandler = require("../utils/CommandHandler");
const { messagesCache } = require("../settings/cache");
const { getGroupMetadataCached } = require("../utils/groupMetaData");
const { prefix, botOwner } = require("../settings/infoBot.json");
const handleNonCommandMessage = require("../utils/handleNonCommandMessage");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");

const filePath = path.join(__dirname, "../database/groups.json");
let groupsData = JSON.parse(fs.readFileSync(filePath));

//para evitar que o arquivo de grupos seja carregado toda hora
fs.watchFile(filePath, () => {
  groupsData = JSON.parse(fs.readFileSync(filePath));
});

async function messagesUpsert(sock, { messages }) {
  const messageInfo = messages[0];
  if (!messageInfo.message || !messageInfo.pushName) return;

  const groupData = groupsData.find(group => group.id == messageInfo.key.remoteJid);

  if (groupData?.revelar) {
    messagesCache.set(messageInfo.key.id, JSON.stringify(messageInfo));
  }

  const textOfMessage = getTextOfMessage(messageInfo);
  const chatId = messageInfo.key.remoteJid;
  const quoted = messageInfo;
  const isCommand = textOfMessage.startsWith(prefix) && textOfMessage.length > 1;
  const command = isCommand? textOfMessage.slice(1).split(/ +/).shift().toLowerCase() : null;
  const args = textOfMessage.trim().split(/ +/).splice(1);
  const arg = args.join(" ");
  const key = messageInfo.key;
  const pushName = messageInfo.pushName;
  const botNumber = sock.user.id.replace(/:\d+/, "");

  const isGroup = chatId.endsWith("@g.us");
  const groupMetadata = isGroup ? await getGroupMetadataCached(sock, chatId) : [];
  const groupMembers = isGroup ? _.map(groupMetadata.participants, "id") : [];
  const groupAdmins = isGroup ? _.map(_.filter(groupMetadata.participants, "admin"), "id")  : [];
  const sender = isGroup ? messageInfo.key.participant : chatId;
  const senderIsAdm = isGroup && groupAdmins.includes(sender);
  const botIsAdm = isGroup && groupAdmins.includes(botNumber);
  const senderIsOwner = botOwner == sender.split("@")[0];

  const reply = text => sock.sendMessage(chatId, { text }, { quoted });
  const sendReact = react => sock.sendMessage(chatId, { react: { text: react, key } });

  const options = {
    sock, prefix, messageInfo, chatId, pushName,
    botNumber, quoted, args, arg, key, isGroup, senderIsOwner,
    groupMembers, sender, senderIsAdm, reply, botOwner,
    sendReact, botIsAdm, textOfMessage, groupAdmins
  };

  if (isCommand) {

    const commandHandler = new CommandHandler(options);

    await commandHandler.execute(command);
  } else {
    await handleNonCommandMessage({ ...options });
  }
}

module.exports = messagesUpsert;
