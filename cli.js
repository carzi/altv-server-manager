#!/usr/bin/env node
const { program } = require("commander");

const create = require("./controllers/create");
const update = require("./controllers/update");
const start = require("./controllers/start");
const dev = require("./controllers/dev");

program.name("altv");

program.command("create").description("Создать сервер в текущей папке.").action(create);
program.command("update").description("Скачать или обновить файлы сервера.").action(update);
program
  .command("start")
  .description("Запустить сервер в режиме продакшена.")
  .option("-m", "Максимально уменьшить выходные файлы.")
  .action(start);
program.command("dev").description("Запустить сервер в режиме разработки.").action(dev);

program.parse();
