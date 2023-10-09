import chokidar from "chokidar";
import { join } from "path";
import { IArgsDev } from "types/options";
import * as Typescript from "../utils/compiler/typescript";
import { ShowLogo } from "../utils/config";
import { execute } from "../utils/execute";

const serverDir = join(process.cwd(), "altv-server");

export default async (args: IArgsDev) => {
  ShowLogo();
  if (args.Ts) {
    await Typescript.build(false);
    const watchDir = join(process.cwd(), "src");
    let proc = execute();
    chokidar
      .watch(watchDir, {
        cwd: serverDir,
        ignored: "!*.ts",
      })
      .on("change", async () => {
        proc.kill();
        process.chdir(join(serverDir, ".."));
        await Typescript.build(false);
        process.chdir(serverDir);
        proc = execute();
      });
  } else if (args.Js) {
    const watchDir = join(process.cwd(), "altv-server", "resources");
    let proc = execute();
    chokidar
      .watch(join(watchDir), {
        cwd: serverDir,
        ignored: "!*.js",
      })
      .on("change", () => {
        proc.kill();
        process.chdir(join(serverDir, ".."));
        process.chdir(serverDir);
        proc = execute();
      });
  }
};
