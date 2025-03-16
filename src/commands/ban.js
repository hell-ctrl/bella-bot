const { group, error, ban } = require("../settings/messages.js");

module.exports = {
    name: "ban",
    description: "Bane um usuário do grupo.",
    run: async ({ sock, botNumber, reply, groupMembers, groupAdmins, messageInfo, chatId, isGroup, senderIsAdm, botIsAdm, sendReact }) => {
        if (!isGroup) return;
        if (!senderIsAdm) return reply(group.onlyAdm);
        if (!botIsAdm) return reply(group.botIsNotAdm);

        const contextInfo = messageInfo.message?.extendedTextMessage?.contextInfo;
        const userToBan = contextInfo.mentionedJid[0] || contextInfo.participant;

        if (!userToBan) return reply(ban.noUser);
        if (!groupMembers.includes(userToBan)) return reply(ban.userNotInGroup);
        if (groupAdmins.includes(userToBan)) return reply(ban.userIsAdm);

        if (userToBan === botNumber) return reply(ban.cantBanBot);
    
        try {
            await reply(ban.banning);
            await sock.groupParticipantsUpdate(chatId, [userToBan], "remove");
            sendReact("✅");
        } catch {
            reply(error);
        }
    }
}
