const axios = require("axios");
const fs = require("fs-extra");

const file = async (url, path) => {
  await fs.ensureFile(path);

  const response = await axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });

  const fileSize = await response.headers["content-length"];
  const writer = fs.createWriteStream(path);

  response.data.pipe(writer);

  let downloadedSize = 0;
  response.data.on("data", (chunk) => {
    downloadedSize += chunk.length;
    const percent = ((downloadedSize / fileSize) * 100).toFixed();
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    if (percent !== "100" && percent !== 'NaN') {
      process.stdout.write(`[${"#".repeat(percent)}${".".repeat(100 - percent)}] ${percent}%`);
    } else {
      process.stdout.write("");
    }
  });

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
};

const files = async (files) => {
  for (let i = 0; i < files.length; i++) {
    try {
      const fileName = files[i].url.split("/");
      console.log(`Скачивание файла ${fileName[fileName.length - 1]}`);
      await file(files[i].url, files[i].path);
    } catch (error) {
      console.error("Ошибка при скачивании файла.");
    }
  }
  console.log("Все файлы скачаны.");
};

module.exports = { file, files };
