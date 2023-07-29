const { spawn } = require("child_process");
const Build = require("../utils/build");
const chokidar = require("chokidar");
const { join } = require("path");

module.exports = async (...args) => {
  await Build(false);
  const path = join(process.cwd(), "altv-server");

  let proc = spawn(join(path, "altv-server.exe"), { cwd: path, stdio: "inherit" });

  chokidar
    .watch(join(process.cwd(), "modules"), {
      cwd: path,
      ignored: "!*.ts",
    })
    .on("change", async (file) => {
      proc.kill();
      process.chdir(join(path, ".."));
      await Build(false);
      process.chdir(path);
      proc = spawn(join(path, "altv-server.exe"), { cwd: path, stdio: "inherit" });
    });
};
