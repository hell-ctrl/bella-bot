const { groupsCache } = require("../settings/cache");

async function getGroupMetadataCached(sock, groupId) {
  let metadata = groupsCache.get(groupId);

  if (!metadata) {
    metadata = await sock.groupMetadata(groupId);
    groupsCache.set(groupId, metadata);
  }

  return metadata;
}

async function handleGroupParticipantsUpdate(sock, update) {
  groupsCache.del(update.id);

  const newMetadata = await sock.groupMetadata(update.id);
  groupsCache.set(update.id, newMetadata);
}

module.exports = { getGroupMetadataCached, handleGroupParticipantsUpdate };
