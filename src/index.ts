#!/usr/bin/env node
import { program } from "commander";
import build from "./actions/build";
import dev from "./actions/dev";
import init from "./actions/init";
import update from "./actions/update";

program.name("altv");

program
  .command("init")
  .description("initialization altv server project")
  .option("-nologo", "don't show logo")
  .option("-win", "for Windows")
  .option("-linux", "for Linux")
  .option("-release", "use release branch")
  .option("-rc", "use release branch")
  .option("-dev", "use release branch")
  .option("-ts", "use Typescript module")
  .option("-js", "use Javascript module")
  .option("-csharp", "use C# module")
  .option("-rust", "use Rust module")
  .action((...args) => init(args[0]));

program
  .command("update")
  .description("update altv server files")
  .option("-win", "for Windows")
  .option("-linux", "for Linux")
  .option("-release", "use release branch")
  .option("-rc", "use release branch")
  .option("-dev", "use release branch")
  .option("-ts", "use Typescript module")
  .option("-js", "use Javascript module")
  .option("-csharp", "use C# module")
  .option("-rust", "use Rust module")
  .option("-server", "update server files")
  .option("-data", "update data files")
  .option("-module", "update module files")
  .action((...args) => update(args[0]));

program
  .command("dev")
  .description("run server in developer mode")
  .option("-ts", "use for Typescript module")
  .option("-js", "use for Javascript module")
  .option("-csharp", "use for C# module")
  .option("-rust", "use for Rust module")
  .action((...args) => dev(args[0]));

program
  .command("build")
  .description("build server for production")
  .option("-minify", "minify Typescript output files")
  .option("-ts", "use for Typescript module")
  .option("-js", "use for Javascript module")
  .option("-csharp", "use for C# module")
  .option("-rust", "use for Rust module")
  .action((...args) => build(args[0]));

program.parse();
