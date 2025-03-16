const fs = require("fs");
const path = require("path");
const { logCommand } = require("./command");

const filePath = path.join(__dirname, "../database/blockedCommands.json");

class CommandHandler {
  constructor(options) {
    this.options = options;
    this.commands = new Map();
    this.loadCommands();
    this.loadBlockedCommands();
  }

  loadCommands() {
    const commandFiles = fs
      .readdirSync(path.join(__dirname, "../commands"))
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      this.commands.set(command.name, command);
    }
  }

  loadBlockedCommands() {
    if (fs.existsSync(filePath)) {
      this.blockedCommands = JSON.parse(fs.readFileSync(filePath));
    } else {
      this.blockedCommands = [];
    }
  }

  saveBlockedCommands() {
    fs.writeFileSync(filePath, JSON.stringify(this.blockedCommands, null, 2));
  }

  blockCommand(commandName) {
    if (!this.blockedCommands.includes(commandName)) {
      this.blockedCommands.push(commandName);
      this.saveBlockedCommands();
    }
  }

  unblockCommand(commandName) {
    this.blockedCommands = this.blockedCommands.filter(cmd => cmd !== commandName);
    this.saveBlockedCommands();
  }

  isCommandBlocked(commandName) {
    return this.blockedCommands.includes(commandName);
  }

  handleBlockUnblock(commandName, action, reply) {
    if (action === "@block") {
      this.blockCommand(commandName);
      return reply(`*Sucesso ✅:* Comando *${commandName}* bloqueado!`);
    }

    if (action === "@unblock") {
      this.unblockCommand(commandName);
      return reply(`*Sucesso ✅:* Comando *${commandName}* desbloqueado!`);
    }
  }

  execute(commandName) {
    const command = this.commands.get(commandName);
    const { reply, senderIsOwner, arg } = this.options;

    logCommand(commandName);

    if (!command) {
      return reply("*Aviso ⚠️:* Comando não encontrado!");
    }

    if (!senderIsOwner && this.isCommandBlocked(commandName)) {
      return reply("*Aviso ⚠️:* Este comando está bloqueado!");
    }

    if (senderIsOwner && (arg === "@block" || arg === "@unblock")) {
      return this.handleBlockUnblock(commandName, arg, reply);
    }

    command.run({ ...this.options });
  }
}

module.exports = CommandHandler;
