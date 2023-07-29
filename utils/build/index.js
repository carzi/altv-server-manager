const fs = require("fs-extra");

const { ClearModulesFolder } = require("./clear");
const { BuildModules } = require("./modules");
const { FixImports } = require("./import");
const { Compile } = require("./compile");

const resourcePath = "./altv-server/resources/main/";
const modulesPath = "./modules";
const buildPath = "./.build";

module.exports = async (minified) => {
  const startTime = Date.now();
  await ClearModulesFolder(buildPath, resourcePath);
  await BuildModules(buildPath, modulesPath);
  await FixImports(buildPath);
  await Compile(buildPath, minified);
  await fs.copy(buildPath, resourcePath);
  console.log(`\nКомпиляция завернеша успешно. Время компиляции ${Date.now() - startTime}мс. \n`);
};
