const Build = require("../utils/build");
const {execute} = require("../utils/execute");

module.exports = async (...args) => {
  await Build(args[0].m);
  execute();
};
