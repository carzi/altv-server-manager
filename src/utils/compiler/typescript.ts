import { transformSync } from "@swc/core";
import fs from "fs-extra";
import { extname, join } from "path";
const { minify } = require("terser");

const outputDir = join(process.cwd(), "altv-server", "resources");
const sourceDir = join(process.cwd(), "src");

export const build = async (minify: boolean) => {
  const startTime = Date.now();
  await fs.remove(outputDir);
  await compileFiles(sourceDir, outputDir, minify);
  await copyFilesAndFolders(sourceDir, outputDir);
  console.log(`\nCompilation completed successfully. Compilation time ${Date.now() - startTime}ms.`);
};

async function compileFiles(sourceDir: string, outputDir: string, minifyFile: boolean) {
  try {
    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const filePath = join(sourceDir, file);
      const outputFilePath = join(outputDir, file);

      if ((await fs.stat(filePath)).isDirectory()) {
        await compileFiles(filePath, outputFilePath, minifyFile);
      } else if (file.endsWith(".ts")) {
        const tsCode = await fs.readFile(filePath, "utf-8");
        const jsCode = transformSync(tsCode, {
          jsc: {
            parser: { syntax: "typescript" },
            target: "esnext",
          },
        });
        await fs.ensureDir(outputDir);
        if (minifyFile) {
          const minifyCode = await minify(jsCode.code, { mangle: { module: true }, module: true });
          await fs.writeFile(outputFilePath.replace(".ts", ".js"), minifyCode.code);
        } else {
          await fs.writeFile(outputFilePath.replace(".ts", ".js"), jsCode.code);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function copyFilesAndFolders(sourceDir: string, outputDir: string) {
  try {
    const items = await fs.readdir(sourceDir);

    for (const item of items) {
      const sourceItemPath = join(sourceDir, item);
      const targetItemPath = join(outputDir, item);

      if ((await fs.stat(sourceItemPath)).isDirectory()) {
        await copyFilesAndFolders(sourceItemPath, targetItemPath);
      } else {
        if (extname(item) !== ".ts") await fs.copyFile(sourceItemPath, targetItemPath);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
