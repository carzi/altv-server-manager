const fs = require("fs-extra");
const Update = require("../controllers/update");
const Config = require("../configs/create");

module.exports = async (...args) => {
  await Update();
  await fs.ensureDir("./altv-server");
  console.log('Создание папки modules')
  await fs.ensureDir("./modules");
  console.log('Создание файла server.toml')
  await fs.writeFile("./altv-server/server.toml", Config.cfg);
  await fs.ensureDir("./altv-server/resources/main");
  console.log('Создание файла resource.toml')
  await fs.writeFile("./altv-server/resources/main/resource.toml", Config.resource);
  console.log('Создание файла package.json')
  await fs.writeFile("./altv-server/resources/main/package.json", Config.package);
};
