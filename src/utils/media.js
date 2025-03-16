const { downloadContentFromMessage } = require("baileys");

function isQuotedImage(messageInfo) {
  const quotedImage =messageInfo?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;
  const imageCaption = messageInfo?.message?.imageMessage?.caption;

  return Boolean(quotedImage || imageCaption);
}

function isQuotedVideo(messageInfo) {
  const quotedImage = messageInfo?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage;
  const imageCaption = messageInfo?.message?.videoMessage?.caption;

  return Boolean(quotedImage || imageCaption);
}

function isQuotedSticker(messageInfo) {
  const quotedSticker = messageInfo?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage;

  return Boolean(quotedSticker);
}

function getMediaMessageContent(messageInfo) {
  const mediaQuoted = messageInfo?.message?.extendedTextMessage?.contextInfo?.quotedMessage;

  return (
    mediaQuoted?.imageMessage ||
    mediaQuoted?.videoMessage ||
    mediaQuoted?.stickerMessage ||
    mediaQuoted?.audioMessage ||
    messageInfo?.message?.imageMessage ||
    messageInfo?.message?.videoMessage ||
    messageInfo?.message?.stickerMessage ||
    messageInfo?.message?.audioMessage ||
    null
  );
}

async function getFileBufferFromWhatsapp(media, mediaType) {
  const stream = await downloadContentFromMessage(media, mediaType);
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
}

module.exports = {
  isQuotedImage,
  isQuotedVideo,
  isQuotedSticker,
  getMediaMessageContent,
  getFileBufferFromWhatsapp,
};
