function getTextOfMessage(messageInfo) {
  return (
    Object.values({
      conversation: messageInfo?.message?.conversation,
      imageMessage: messageInfo?.message?.imageMessage?.caption,
      videoMessage: messageInfo?.message?.videoMessage?.caption,
      extendedTextMessage: messageInfo?.message?.extendedTextMessage?.text
    }).find((value) => value?.trim()) || ""
  );
}

function getTypeMessage(messageInfo) {
 const { message } = messageInfo;

  if (message.extendedTextMessage || message.conversation) return "text";
  if (message.imageMessage) return "image";
  if (message.videoMessage) return "video";
  if (message.stickerMessage) return "sticker";
  if (message.audioMessage) return "audio";

  return "unknown";
}

module.exports = {
  getTextOfMessage,
  getTypeMessage
};
