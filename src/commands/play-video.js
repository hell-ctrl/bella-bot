const fs = require("fs");
const { searchAndDownload } = require("../utils/ytdl");
const { noArgs, error } = require("../settings/messages");

module.exports = {
  name: "play-video",
  description: "Baixa e envia vídeo do YouTube.",
  run: async ({ sock, chatId, arg, quoted, reply, sendReact }) => {
    try {
      if (!arg) return reply(noArgs);

      sendReact("⏳");

      const { videoData, filePath } = await searchAndDownload(arg, "mp4");

      await sock.sendMessage(chatId,
        {
          video: { url: filePath },
          contextInfo: {
            externalAdReply: {
              title: videoData.title,
              body: "★ ʙᴇʟʟᴀ",
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