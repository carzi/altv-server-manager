import axios from "axios";
import { IFiles } from "../types/files";
import { ISettings } from "../types/settings";

const cdn = "https://cdn.alt-mp.com";

export const SERVER_CONFIG = `name = 'alt:V Server'
host = '0.0.0.0'
port = 7788
players = 128
# password = 'ultra-password'
announce = false
# token = 'YOUR_TOKEN'
gamemode = 'Freeroam'
website = 'example.com'
language = 'en'
description = 'alt:V Sample Server'
resources = [ 'example' ]
modules = [ 'js-module' ]
`;

export const RESOURCE_CONFIG = `type = 'js'
main = 'server/index.js'
client-main = 'client/index.js'
client-files = [ 'client/*' ]`;

export const PACKAGE_CONFIG = `{
	"type": "module"
}`;

export const getBranchVersion = async () => {
  return {
    x64_win32: {
      release: async () => (await axios.get("https://cdn.alt-mp.com/server/release/x64_win32/update.json")).data.version,
      rc: async () => (await axios.get("https://cdn.alt-mp.com/server/rc/x64_win32/update.json")).data.version,
      dev: async () => (await axios.get("https://cdn.alt-mp.com/server/dev/x64_win32/update.json")).data.version,
    },
    x64_linux: {
      release: async () => (await axios.get("https://cdn.alt-mp.com/server/release/x64_linux/update.json")).data.version,
      rc: async () => (await axios.get("https://cdn.alt-mp.com/server/rc/x64_linux/update.json")).data.version,
      dev: async () => (await axios.get("https://cdn.alt-mp.com/server/dev/x64_linux/update.json")).data.version,
    },
  };
};

export const getFilesUrls = async ({ system, branch, serverModule, misc }: ISettings) => {
  const serverFiles: IFiles[] = [];
  const moduleFiles: IFiles[] = [];
  const dataFiles: IFiles[] = [];

  if (misc.includes("server")) {
    const updateServerFile = await axios.get(`${cdn}/server/${branch}/${system}/update.json`).then((res) => res.data);
    Object.keys(updateServerFile.sizeList).map((item) =>
      serverFiles.push({
        url: `${cdn}/server/${branch}/${system}/${item}`,
        path: `./altv-server/${item}`,
      })
    );
  }

  if (misc.includes("module") && (serverModule === "js" || serverModule === "ts")) {
    const updateModuleFile = await axios.get(`${cdn}/js-module/${branch}/${system}/update.json`).then((res) => res.data);
    Object.keys(updateModuleFile.sizeList).map((item) =>
      moduleFiles.push({
        url: `${cdn}/js-module/${branch}/${system}/${item}`,
        path: `./altv-server/${item}`,
      })
    );
  }

  if (misc.includes("data")) {
    const updateDataFile = await axios.get(`${cdn}/data/${branch}/update.json`).then((res) => res.data);
    Object.keys(updateDataFile.sizeList).map((item) =>
      dataFiles.push({
        url: `${cdn}/data/${branch}/${item}`,
        path: `./altv-server/${item}`,
      })
    );
  }

  return [...serverFiles, ...moduleFiles, ...dataFiles];
};

export const ShowLogo = () => {
  console.log("");
  console.log("   █████╗ ██╗  ████████╗   ██╗   ██╗    ███╗   ███╗██╗   ██╗██╗  ████████╗██╗██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗");
  console.log("  ██╔══██╗██║  ╚══██╔══╝██╗██║   ██║    ████╗ ████║██║   ██║██║  ╚══██╔══╝██║██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗");
  console.log("  ███████║██║     ██║   ╚═╝██║   ██║    ██╔████╔██║██║   ██║██║     ██║   ██║██████╔╝██║     ███████║ ╚████╔╝ █████╗  ██████╔╝");
  console.log("  ██╔══██║██║     ██║   ██╗╚██╗ ██╔╝    ██║╚██╔╝██║██║   ██║██║     ██║   ██║██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗");
  console.log("  ██║  ██║███████╗██║   ╚═╝ ╚████╔╝     ██║ ╚═╝ ██║╚██████╔╝███████╗██║   ██║██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║");
  console.log("  ╚═╝  ╚═╝╚══════╝╚═╝        ╚═══╝      ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝   ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝");
  console.log("");
};
