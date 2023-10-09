import { IArgsInit, IArgsUpdate } from "types/options";

const { select, checkbox } = require("@inquirer/prompts");
const { getBranchVersion } = require("./config");

export const askSystem = async (args: IArgsInit | IArgsUpdate) => {
  if (args.Win || args.Linux) {
    return args.Win ? "x64_win32" : "x64_linux";
  } else {
    return await select({
      message: "Select operating system:",
      choices: [
        { name: "Windows", value: "x64_win32" },
        { name: "Linux", value: "x64_linux" },
      ],
    });
  }
};

export const askBranch = async (args: IArgsInit | IArgsUpdate, system: string) => {
  if (args.Release || args.Rc || args.Dev) {
    if (args.Release) {
      return "release";
    } else if (args.Rc) {
      return "rc";
    } else if (args.Dev) {
      return "dev";
    }
  } else {
    const versions = await getBranchVersion();

    return await select({
      message: "Select server branch:",
      choices: [
        { name: `Release [#${await versions[system].release()}]`, value: "release" },
        { name: `Release candidate [#${await versions[system].rc()}]`, value: "rc" },
        { name: `Development [#${await versions[system].dev()}]`, value: "dev" },
      ],
    });
  }
};

export const askServerModule = async (args: IArgsInit | IArgsUpdate) => {
  if (args.Ts || args.Js || args.Csharp || args.Rust) {
    if (args.Ts) {
      return "ts";
    } else if (args.Js) {
      return "js";
    }
    //  else if (args.Csharp) {
    //   return "csharp";
    // } else if (args.Rust) {
    //   return "rust";
    // }
  } else {
    return await select({
      message: "Select server-side module:",
      choices: [
        { name: "Typescript", value: "ts" },
        { name: "Javascript", value: "js" },
        { name: "C# (official)", value: "csharp", disabled: true },
        { name: "RUST (by xshady)", value: "rust", disabled: true },
      ],
    });
  }
};

export const askMisc = async (args: IArgsUpdate) => {
  if (args.Server || args.Data || args.Module) {
    const selected = [];
    if (args.Server) selected.push("server");
    if (args.Data) selected.push("data");
    if (args.Module) selected.push("module");
    return selected;
  } else {
    return await checkbox({
      message: "Select what you want update:",
      choices: [
        { name: "Server execute files", value: "server", checked: true },
        { name: "Data files", value: "data", checked: true },
        { name: "Module files", value: "module", checked: true },
      ],
    });
  }
};
