const { spawn } = require("child_process");
const { join } = require("path");
const Build = require("../utils/build");

module.exports = async (...args) => {
  await Build(args[0].m);
  const path = join(process.cwd(), "altv-server");
  spawn(join(path, "altv-server.exe"), { cwd: path, stdio: "inherit" });
};
