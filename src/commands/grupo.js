const { group, error, noArgs } = require("../settings/messages");

module.exports = {
  name: "grupo",
  description: "Ativa ou desativa funcionalidades do grupo como antilink, revelação e boas-vindas.",
  run: async ({ sock, reply, chatId, isGroup, senderIsAdm, botIsAdm, sendReact, args }) => {
    if (!isGroup) return;
    if (!senderIsAdm) return reply(group.onlyAdm);
    if (!botIsAdm) return reply(group.botIsNotAdm);
    if (!args) return reply(noArgs);

    if (!["abrir", "fechar"].includes(args[0].toLowerCase())) {
      return reply(group.invalidOption);
    }

    const action = args[0].toLowerCase() === "abrir" ? "not_announcement" : "announcement";
    
    try {
      await sock.groupSettingUpdate(chatId, action);
      sendReact(action === "not_announcement" ? "🔓" : "🔒");
    } catch {
      reply(error);
    }
  },
};
