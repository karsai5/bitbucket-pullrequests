const fs = require("fs");
const ini = require("ini");

const homedir = require("os").homedir();
const CONFIG_FILE = `${homedir}/.bb-prs.ini`;

let config;

if (fs.existsSync(CONFIG_FILE)) {
  config = ini.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
} else {
  config = {};
}

module.exports = config;

module.exports = {
  vars: config,
  CONFIG_FILE,
};
