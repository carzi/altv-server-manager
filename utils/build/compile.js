const { minify } = require("terser");
const swc = require("@swc/core");
const { join } = require("path");
const fs = require("fs-extra");

async function compileTsFile(file, minified) {
  const input = await fs.readFile(file, "utf-8");
  let output = await swc.transform(input, {
    filename: file,
    jsc: {
      parser: { syntax: "typescript" },
      target: "esnext",
    },
  });
  const outputFilePath = file.replace(".ts", ".js");
  if (minified) output = await minify(output.code, { mangle: { module: true }, module: true });
  fs.outputFileSync(outputFilePath, output.code, "utf-8");
  fs.removeSync(file);
}

const Compile = async (path, minified) => {
  const files = await fs.readdir(path);
  for (const file of files) {
    const filePath = join(path, file);
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      await Compile(filePath, minified);
    } else if (file.endsWith(".ts")) {
      await compileTsFile(filePath, minified);
    }
  }
};

module.exports = { Compile };
