const { join } = require("path");
const { select } = require("@inquirer/prompts");
const Config = require('../configs/update')
const Download = require('../utils/download')

module.exports = async (...args) => {
  const system = await select({
    message: "Выберите систему",
    choices: [
      {
        name: "Windows",
        value: "win",
      },
      {
        name: "Linux",
        value: "linux",
      },
      {
        name: "Both (Win + Linux)",
        value: "both",
      },
    ],
  });

  const branch = await select({
    message: "Выберите ветку",
    choices: [
      {
        name: "Release",
        value: "release",
      },
      {
        name: "Dev",
        value: "dev",
      },
    ],
  });


  switch (system) {
    case "win":
      await Download.files([...Config[branch].dataFile, ...Config[branch].winFiles]);
      break;
    case "linux":
      await Download.files([...Config[branch].dataFile, ...Config[branch].linuxFiles]);
      break;
    case "both":
      await Download.files([...Config[branch].dataFile, ...Config[branch].winFiles, ...Config[branch].linuxFiles]);
      break;
    default:
      console.error("Error.");
      break;
  }
};
