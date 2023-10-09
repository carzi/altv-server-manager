import { IArgsUpdate } from "types/options";
import { ISettings } from "types/settings";
import { getFilesUrls, ShowLogo } from "../utils/config";
import { DownloadFiles } from "../utils/download";
import { askBranch, askMisc, askServerModule, askSystem } from "../utils/questions";

export default async (args: IArgsUpdate) => {
  const settings: ISettings = {
    system: null,
    branch: null,
    serverModule: null,
    misc: [],
  };

  ShowLogo();

  settings.misc = await askMisc(args);
  settings.system = await askSystem(args);
  if (settings.system) settings.branch = await askBranch(args, settings.system);
  if (settings.misc.includes("module")) settings.serverModule = await askServerModule(args);

  const files = await getFilesUrls(settings);
  await DownloadFiles(files);
};
