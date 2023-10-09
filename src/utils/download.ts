import { IFiles } from "types/files";

import axios from "axios";
import fs from "fs-extra";

const file = async ({ url, path }: IFiles) => {
  await fs.ensureFile(path);

  const response = await axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });

  const fileName = url.split("/");
  const fileSize = await response.headers["content-length"];
  const writer = fs.createWriteStream(path);

  response.data.pipe(writer);

  let downloadedSize = 0;
  response.data.on("data", (chunk: any) => {
    downloadedSize += chunk.length;
    const percent = ((downloadedSize / fileSize) * 100).toFixed();
    // process.stdout.clearLine();
    process.stdout.cursorTo(0);
    if (percent !== "100" && percent !== "NaN") {
      process.stdout.write(`[ ${percent}% ] Downloading file >> ${fileName[fileName.length - 1]}`);
    } else {
      process.stdout.write("");
    }
  });

  return new Promise((resolve, reject) => {
    writer.on("finish", (stream: any) => {
      console.log(`[ DONE ] Downloading file >> ${fileName[fileName.length - 1]}`);
      return resolve(stream);
    });
    writer.on("error", reject);
  });
};

export const DownloadFiles = async (files: IFiles[]) => {
  for (let i = 0; i < files.length; i++) {
    try {
      await file(files[i]);
    } catch (error) {
      const fileName = files[i].url.split("/");
      console.error(`Error when downloading file ${fileName[fileName.length - 1]}.`);
    }
  }
};
