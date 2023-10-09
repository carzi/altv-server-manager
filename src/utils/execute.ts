import { spawn } from "child_process";
import os from "os";
import { join } from "path";

const fileByOs = os.platform() === "win32" ? "altv-server.exe" : "altv-server";

const path = join(process.cwd(), "altv-server");
export const execute = () => {
  console.log("");
  return spawn(join(path, fileByOs), { cwd: path, stdio: "inherit" });
};
