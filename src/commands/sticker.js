const { getFileBufferFromWhatsapp, isQuotedImage, getMediaMessageContent, isQuotedVideo } = require("../utils/media");
const { sticker, error } = require("../settings/messages");
const createSticker = require("../utils/createSticker");

module.exports = {
  name: "s",
  description: "Cria uma figurinha a partir de uma imagem ou um video.",
  run: async ({ sock, chatId, messageInfo, quoted, reply }) => {
    try {
      if (isQuotedImage(messageInfo) || isQuotedVideo(messageInfo)) {
        const media = getMediaMessageContent(messageInfo);

        const mediaType = "seconds" in media ? "video" : "image";

        if (media?.seconds > 10) {
          return reply(sticker.videoTooLong);
        }

        const mediaBuffer = await getFileBufferFromWhatsapp(media, mediaType);

        const stickerBuffer = await createSticker(mediaBuffer, {
          author: "mneto_nx",
        });

        return sock.sendMessage(chatId,
          { sticker: stickerBuffer },
          { quoted }
        );
      }

      reply(sticker.noMedia);
    } catch {
      reply(error);
    }
  },
};
