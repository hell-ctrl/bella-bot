const fs = require("fs");
const path = require("path");
const { noArgs, invalidOption, revelar, welcome, antilink, group } = require("../settings/messages");

const filePath = path.join(__dirname, "../database/groups.json");

module.exports = {
  name: "set",
  description: "Ativa ou desativa funcionalidades do grupo como antilink, revelação e boas-vindas.",
  run: ({ args, reply, chatId, isGroup, senderIsAdm, botIsAdm }) => {
    if (!isGroup) return;
    if (!senderIsAdm) return reply(group.onlyAdm);
    if (!botIsAdm) return reply(group.botIsNotAdm);
    if (args.length < 2) return reply(noArgs);

    const [feature, status] = args.map((arg) => arg.toLowerCase());

    const validFeatures = {
      revelar,
      "anti-link": antilink,
      "bem-vindo": welcome,
    };

    if (!validFeatures[feature]) return reply(group.invalidCommand);
    if (!["on", "off"].includes(status)) return reply(invalidOption);

    const groupsData = JSON.parse(fs.readFileSync(filePath));
    let groupData = groupsData.find((g) => g.id === chatId)

    if (!groupData) {
      groupData = { id: chatId };
      groupsData.push(groupData);
    }

    if (status === "on") {
      if (groupData[feature]) return reply(validFeatures[feature].isOn);
      groupData[feature] = true;
      reply(validFeatures[feature].on);
    } else {
      if (!groupData[feature]) return reply(validFeatures[feature].isOff);
      groupData[feature] = false;
      reply(validFeatures[feature].off);
    }

    fs.writeFileSync(filePath, JSON.stringify(groupsData, null, 2));
  },
};
