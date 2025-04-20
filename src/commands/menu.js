const fs = require("fs");

module.exports = {
  name: "menu",
  description: "Menu de comandos do bot.",
  run: ({ sock, chatId, prefix, quoted, sender, pushName }) => {
    const n = "`";

    const menu = `
■ 「 *${n}BOT INFO${n}* 」
> *Bot* : Bella Bot
> *Criador* : 559885512460

■ 「 *${n}USER INFO${n}* 」
> *Nome* : ${pushName}
> *Id* : ${sender.split('@')[0]}

━━ ${n}𝗔𝗗𝗠𝗦${n}
★ ${prefix}ban
☆ ${prefix}set (comando status)
★ ${prefix}grupo (abrir/fechar)

━━ ${n}𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗦${n}
★ ${prefix}play-audio (nome/url)
☆ ${prefix}play-video (nome/url)

━━ ${n}𝗙𝗜𝗚𝗨𝗥𝗜𝗡𝗛𝗔𝗦${n}
★ ${prefix}s
☆ ${prefix}toimg
★ ${prefix}togif

━━ ${n}𝗜𝗠𝗔𝗚𝗘𝗡𝗦${n}
★ ${prefix}escrever (texto)
        `;

    const fileOptions = {
      document: fs.readFileSync("./media/fake.pdf"),
      fileName: "𝙗𝙚𝙡𝙡𝙖 𝙗𝙤𝙩 ⭐",
      mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      fileLength: 10000000000,
      pageCount: 999,
      caption: menu,
      contextInfo: {
        externalAdReply: {
          title: "bella bot",
          body: "Clique aqui para abrir o repositório do bot.",
          showAdAttribution: true,
          thumbnailUrl: "https://moewalls.com/wp-content/uploads/2023/01/tomie-kawakami-junji-ito-thumb-728x410.jpg",
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: "https://github.com/hell-ctrl/bella-bot",
        }
      }
    };

    sock.sendMessage(chatId, fileOptions, { quoted });
  },
};
