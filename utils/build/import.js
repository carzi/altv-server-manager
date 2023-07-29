const { extname, join, sep } = require("path");
const fs = require("fs-extra");

function replaceImport(importLine, filePath) {
  const importSplit = importLine.split(" ");
  for (const key in importSplit) {
    if (!importSplit[key].includes("@/")) continue;
    const splitBySlash = importSplit[key].split("/");
    [splitBySlash[1], splitBySlash[2]] = [splitBySlash[2], splitBySlash[1]];
    importSplit[key] = splitBySlash.join("/");
    const newPath = [];
    for (let i = 1; i < filePath.split(sep).length - 1; i++) newPath.push("../");
    importSplit[key] = importSplit[key].replace("@/", newPath.join(""));
  }
  return importSplit.join(" ");
}

async function FixImports(path) {
  const files = await fs.readdir(path);
  for (const file of files) {
    const filePath = join(path, file);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      await FixImports(filePath);
    } else if (stat.isFile() && extname(filePath) === ".ts") {
      const fileContent = await fs.readFile(filePath, "utf-8");
      if (fileContent.includes("import") && fileContent.includes("@/")) {
        const lines = fileContent.split("\n");
        for (const line in lines) {
          if (!lines[line].includes("import") || !lines[line].includes("@/")) continue;
          lines[line] = replaceImport(lines[line], filePath);
        }
        await fs.writeFile(filePath, lines.join("\n"), "utf-8");
      }
    }
  }
}

module.exports = { FixImports }