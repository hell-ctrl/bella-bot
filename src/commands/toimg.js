const { isQuotedSticker, getMediaMessageContent, getFileBufferFromWhatsapp } = require("../utils/media");
const { sticker, error } = require("../settings/messages");

module.exports = {
  name: "toimg",
  description: "Converte um sticker em imagem.",
  run: async ({ reply, messageInfo, sock, chatId, quoted }) => {
    try {
      if (isQuotedSticker(messageInfo)) {
        const media = getMediaMessageContent(messageInfo);
        const buffer = await getFileBufferFromWhatsapp(media, "sticker");

        await sock.sendMessage(chatId, {
          image: buffer
        }, { quoted });

      } else {
        reply(sticker.noQuotedSticker);
      }
    } catch {
      reply(error);
    }
  },
};
