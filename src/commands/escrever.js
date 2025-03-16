const { exec } = require("child_process");
const { error, noArgs } = require("../settings/messages");
const fs = require("fs");
const { send } = require("process");

module.exports = {
  name: "escrever",
  description: "Escreve um texto em uma imagem.",
  run: ({ arg, reply, sock, chatId, sendReact }) => {
    if (!arg) return reply(noArgs);

    sendReact("⏳");
    
    const formattedText = arg.replace(/(\S+\s*){1,10}/g, "$&\n").split("\n").slice(0, 31).join("\n");
    const randomId = `${Math.random().toString(36).substring(2, 10)}`;

    const inputImage = "./media/folha.jpg";
    const outputImage = `./src/temp/folha_${randomId}.jpg`;
    const fontPath = "./media/Indie-Flower.ttf";

    const command = `convert ${inputImage} -font ${fontPath} -size 960x1280 -pointsize 23 -interline-spacing 2 -annotate +140+133 "${formattedText}" ${outputImage}`;
    
    exec(command, async (e) => {
      if (e) {
        return reply(error);
      };
      
      await sock.sendMessage(chatId, {
        image: { url: outputImage },
      });

      fs.unlinkSync(outputImage);
    });
  },
};
