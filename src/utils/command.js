const clc = require("cli-color");

const logCommand = (command) => {
  const now = new Date();
  const timestamp = now.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  const separator = "─".repeat(25);

  console.log(`${clc.cyan(`[${timestamp}]`)}`);
  console.log(`${clc.yellow(`[COMANDO | ${clc.bold(command.toUpperCase())}]`)}`)
  console.log(separator + "┘");
};


module.exports = {
  logCommand,
};
