const fs = require("fs");
const { searchAndDownload } = require("../utils/ytdl");
const { error, noArgs } = require("../settings/messages");

module.exports = {
  name: "play-audio",
  description: "Baixa e envia áudio do YouTube.",
  run: async ({ sock, chatId, arg, quoted, reply, sendReact }) => {
    try {
      if (!arg) return reply(noArgs);

      sendReact("⏳");

      const { videoData, filePath } = await searchAndDownload(arg, "mp3");

      await sock.sendMessage(chatId,
        {
          audio: { url: filePath },
          mimetype: "audio/mp4",
          ptt: true,
          contextInfo: {
            externalAdReply: {
              renderLargerThumbnail: true,
              title: videoData.title,
              body: "★ ʙᴇʟᴀ",
              thumbnailUrl: videoData.thumbnail,
              sourceUrl: videoData.url,
              mediaType: 1,
            },
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363144038483540@newsletter",
              newsletterName: "WhatsApp",
              serverMessageId: 143,
            },
          },
        },
        { quoted }
      );

      fs.unlinkSync(filePath);

    } catch {
      reply(error);
    }
  },
};
