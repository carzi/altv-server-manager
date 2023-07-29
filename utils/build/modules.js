const { join } = require("path");
const fs = require("fs-extra");

const BuildModules = async (buildPath, modulesPath) => {
  const importModules = {
    client: [],
    server: [],
  };
  const files = await fs.readdir(modulesPath);
  for (const currentModuleName of files) {
    const currentModulePath = join(modulesPath, currentModuleName);
    for (const currentModuleFolder of await fs.readdir(currentModulePath)) {
      switch (currentModuleFolder) {
        case "webview":
          continue;
        case "client":
        case "server":
          importModules[currentModuleFolder].push(`import './${currentModuleName}/index.js'`);
          break;
      }
      await fs.copy(
        join(currentModulePath, currentModuleFolder),
        join(buildPath, currentModuleFolder, currentModuleName)
      );
    }
  }
  await Promise.all([
    fs.outputFile(join(buildPath, "client/index.js"), importModules.client.join("\n")),
    fs.outputFile(join(buildPath, "server/index.js"), importModules.server.join("\n")),
  ]);
};

module.exports = { BuildModules };
