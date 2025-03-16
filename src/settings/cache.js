const NodeCache = require("node-cache");

const messagesCache = new NodeCache({ stdTTL: 300 });
const groupsCache = new NodeCache({ stdTTL: 600 });

module.exports = {
  messagesCache,
  groupsCache,
};
