const { isQuotedSticker, getMediaMessageContent, getFileBufferFromWhatsapp } = require("../utils/media");
const { sticker, error } = require("../settings/messages");
const { promisify } = require("util");
const { exec } = require("child_process");
const fs = require("fs");

const execAsync = promisify(exec);

module.exports = {
  name: "togif",
  description: "Converte um sticker animado em GIF.",
  run: async ({ reply, messageInfo, sock, chatId, quoted }) => {
    try {
      if (isQuotedSticker(messageInfo)) {
        const media = getMediaMessageContent(messageInfo);
        const buffer = await getFileBufferFromWhatsapp(media, "sticker");
        const randomId = Math.random().toString(36).substring(2, 10);

        const inputFile = `./src/temp/sticker_${randomId}.webp`;
        const outputFile = `./src/temp/sticker_${randomId}.mp4`;

        fs.writeFileSync(inputFile, buffer);
        await execAsync(`convert -coalesce ${inputFile} ${outputFile}`);

        await sock.sendMessage(chatId, {
          video: { url: outputFile },
          gifPlayback: true,
        }, { quoted });

        fs.unlinkSync(inputFile);
        fs.unlinkSync(outputFile);
      } else {
        reply(sticker.noQuotedSticker);
      }
    } catch {
      reply(error);
    }
  },
};
