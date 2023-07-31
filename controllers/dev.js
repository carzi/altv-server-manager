const Build = require("../utils/build");
const chokidar = require("chokidar");
const { join } = require("path");
const { execute, path } = require("../utils/execute");

module.exports = async (...args) => {
  await Build(false);
  let proc = execute();
  chokidar
    .watch(join(process.cwd(), "modules"), {
      cwd: path,
      ignored: "!*.ts",
    })
    .on("change", async () => {
      proc.kill();
      process.chdir(join(path, ".."));
      await Build(false);
      process.chdir(path);
      proc = execute();
    });
};
