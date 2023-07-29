const { join } = require("path");
const fs = require("fs-extra");

const ClearModulesFolder = async (buildPath, resourcePath) => {
  await fs.remove(buildPath);
  const files = await fs.readdir(resourcePath);
  for (const file of files) {
    if (file === "resource.toml" || file === "package.json") continue;
    await fs.remove(join(resourcePath, file));
  }
};

module.exports = { ClearModulesFolder };
