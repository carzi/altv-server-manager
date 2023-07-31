const { spawn } = require("child_process");
const { join } = require("path");
const os = require('os')

const fileByOs = os.platform() === 'win32' ? 'altv-server.exe' : 'altv-server'

const path = join(process.cwd(), "altv-server");
const execute = () => spawn(join(path, fileByOs), { cwd: path, stdio: "inherit" });

module.exports = { path, execute }