const cdn = "https://cdn.alt-mp.com";

const release = {
  dataFile: [
    {
      url: `${cdn}/data/release/data/clothes.bin`,
      path: `./altv-server/data/clothes.bin`,
    },
    {
      url: `${cdn}/data/release/data/vehmods.bin`,
      path: `./altv-server/data/vehmods.bin`,
    },
    {
      url: `${cdn}/data/release/data/vehmodels.bin`,
      path: `./altv-server/data/vehmodels.bin`,
    },
    {
      url: `${cdn}/data/release/data/pedmodels.bin`,
      path: `./altv-server/data/pedmodels.bin`,
    },
  ],

  winFiles: [
    {
      url: `${cdn}/server/release/x64_win32/altv-server.exe`,
      path: `./altv-server/altv-server.exe`,
    },
    {
      url: `${cdn}/js-module/release/x64_win32/modules/js-module/js-module.dll`,
      path: `./altv-server/modules/js-module/js-module.dll`,
    },
    {
      url: `${cdn}/js-module/release/x64_win32/modules/js-module/libnode.dll`,
      path: `./altv-server/modules/js-module/libnode.dll`,
    },
  ],

  linuxFiles: [
    {
      url: `${cdn}/server/release/x64_linux/altv-server`,
      path: `./altv-server/altv-server`,
    },
    {
      url: `${cdn}/js-module/release/x64_linux/modules/js-module/libjs-module.so`,
      path: `./altv-server/modules/js-module/libjs-module.so`,
    },
    {
      url: `${cdn}/js-module/release/x64_linux/modules/js-module/libnode.so.108`,
      path: `./altv-server/modules/js-module/libnode.so.108`,
    },
  ],
};

const dev = {
  dataFile: [
    {
      url: `${cdn}/data/dev/data/clothes.bin`,
      path: `./altv-server/data/clothes.bin`,
    },
    {
      url: `${cdn}/data/dev/data/vehmods.bin`,
      path: `./altv-server/data/vehmods.bin`,
    },
    {
      url: `${cdn}/data/dev/data/vehmodels.bin`,
      path: `./altv-server/data/vehmodels.bin`,
    },
    {
      url: `${cdn}/data/dev/data/pedmodels.bin`,
      path: `./altv-server/data/pedmodels.bin`,
    },
    {
      url: `${cdn}/data/dev/data/rpfdata.bin`,
      path: `./altv-server/data/rpfdata.bin`,
    },
    {
      url: `${cdn}/data/dev/data/weaponmodels.bin`,
      path: `./altv-server/data/weaponmodels.bin`,
    },
  ],

  winFiles: [
    {
      url: `${cdn}/server/dev/x64_win32/altv-server.exe`,
      path: `./altv-server/altv-server.exe`,
    },
    {
      url: `${cdn}/server/dev/x64_win32/altv-crash-handler.exe`,
      path: `./altv-server/altv-crash-handler.exe`,
    },
    {
      url: `${cdn}/js-module/dev/x64_win32/modules/js-module/js-module.dll`,
      path: `./altv-server/modules/js-module/js-module.dll`,
    },
    {
      url: `${cdn}/js-module/dev/x64_win32/modules/js-module/libnode.dll`,
      path: `./altv-server/modules/js-module/libnode.dll`,
    },
  ],

  linuxFiles: [
    {
      url: `${cdn}/server/dev/x64_linux/altv-server`,
      path: `./altv-server/altv-server`,
    },
    {
      url: `${cdn}/server/dev/x64_linux/altv-crash-handler`,
      path: `./altv-server/altv-crash-handler`,
    },
    {
      url: `${cdn}/js-module/dev/x64_linux/modules/js-module/libjs-module.so`,
      path: `./altv-server/modules/js-module/libjs-module.so`,
    },
    {
      url: `${cdn}/js-module/dev/x64_linux/modules/js-module/libnode.so.108`,
      path: `./altv-server/modules/js-module/libnode.so.108`,
    },
  ],
};

module.exports = { release, dev }