const ytSearch = require("yt-search");
const ytdl = require("@distube/ytdl-core");
const fs = require("fs");
const { promisify } = require("util");
const execAsync = promisify(require("child_process").exec);

async function searchAndDownload(query, type) {
  const regex = /(?:^|\W)(?:youtube(?:-nocookie)?\.com\/(?:.*[?&]v=|v\/|e(?:mbed)?\/|shorts\/|[^\/]+\/.+\/)|youtu\.be\/)([\w-]+)/;
  let videoData;

  if (query.match(regex)) {
    videoData = await ytSearch({ videoId: query.match(regex)[1] });
  } else {
    const searchResults = await ytSearch(query);
    videoData = searchResults.all[0];
  }

  const randomId = `${Math.random().toString(36).substring(2, 10)}`;
  const filePath = `./src/temp/${type}_${randomId}.${type}`;

  const videoStream = ytdl(videoData.url, {
    filter: "audioandvideo",
    quality: "highest",
  });

  const videoWriteStream = fs.createWriteStream(filePath);
  videoStream.pipe(videoWriteStream);

  await new Promise((resolve, reject) => {
    videoWriteStream.on("finish", resolve);
    videoWriteStream.on("error", reject);
  });

  return { filePath, videoData };
}

module.exports = { searchAndDownload };
