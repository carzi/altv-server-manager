import { IArgsBuild } from "types/options";
import * as Typescript from "../utils/compiler/typescript";
import { ShowLogo } from "../utils/config";

export default async (args: IArgsBuild) => {
  ShowLogo();
  if (args.Ts) {
    await Typescript.build(args.Minify || false);
  }
};
