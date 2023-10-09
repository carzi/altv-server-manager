import fs from "fs-extra";
import { PACKAGE_CONFIG, RESOURCE_CONFIG, SERVER_CONFIG, ShowLogo, getFilesUrls } from "../utils/config";
import { DownloadFiles } from "../utils/download";
import { askBranch, askServerModule, askSystem } from "../utils/questions";

import { IArgsInit } from "../types/options";

export default async (args: IArgsInit) => {
  const settings = {
    system: null,
    branch: null,
    serverModule: null,
    misc: ["server", "data", "module"],
  };

  if (!args.Nologo) ShowLogo();

  settings.system = await askSystem(args);
  if (settings.system) settings.branch = await askBranch(args, settings.system);
  settings.serverModule = await askServerModule(args);

  const files = await getFilesUrls(settings);
  await DownloadFiles(files);

  await fs.writeFile("./altv-server/server.toml", SERVER_CONFIG);
  if (settings.serverModule === "ts") {
    console.log("[ DONE ] Create folder >> ./src");
    await fs.ensureDir("./src");

    console.log("[ DONE ] Create folder >> ./src/example");
    await fs.ensureDir("./src/example");

    console.log("[ DONE ] Create folder >> ./src/example/client");
    await fs.ensureDir("./src/example/client");

    console.log("[ DONE ] Create folder >> ./src/example/server");
    await fs.ensureDir("./src/example/server");

    console.log("[ DONE ] Create file >> ./src/example/client/index.ts");
    await fs.writeFile("./src/example/client/index.ts", "");

    console.log("[ DONE ] Create file >> ./src/example/server/index.ts");
    await fs.writeFile("./src/example/server/index.ts", "");

    console.log("[ DONE ] Create file >> ./src/example/resource.toml");
    await fs.writeFile("./src/example/resource.toml", RESOURCE_CONFIG);

    console.log("[ DONE ] Create file >> ./src/example/package.json");
    await fs.writeFile("./src/example/package.json", PACKAGE_CONFIG);
  } else if (settings.serverModule === "js") {
    console.log("[ DONE ] Create folder >> ./src");
    await fs.ensureDir("./altv-server/resources");

    console.log("[ DONE ] Create folder >> ./src/example");
    await fs.ensureDir("./altv-server/resources/example");

    console.log("[ DONE ] Create folder >> ./src/example/client");
    await fs.ensureDir("./altv-server/resources/example/client");

    console.log("[ DONE ] Create folder >> ./src/example/server");
    await fs.ensureDir("./altv-server/resources/example/server");

    console.log("[ DONE ] Create file >> ./src/example/client/index.js");
    await fs.writeFile("./altv-server/resources/example/client/index.js", "");

    console.log("[ DONE ] Create file >> ./src/example/server/index.js");
    await fs.writeFile("./altv-server/resources/example/server/index.js", "");

    console.log("[ DONE ] Create file >> ./src/example/resource.toml");
    await fs.writeFile("./altv-server/resources/example/resource.toml", RESOURCE_CONFIG);

    console.log("[ DONE ] Create file >> ./src/example/package.json");
    await fs.writeFile("./altv-server/resources/example/package.json", PACKAGE_CONFIG);
  }
};
