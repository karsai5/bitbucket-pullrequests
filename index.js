const ora = require("ora");
const auth = require("./lib/auth");
const printTable = require("./lib/printTable");
const api = require("./lib/api");

const spinner = ora("Loading pull requests 💪");

const main = async () => {
  try {
    const username = auth.getUsername();
    const password = auth.getPassword();

    spinner.start();
    const pullRequests = await api.getPullRequests(username, password);
    spinner.stop();

    printTable(pullRequests);
  } catch (err) {
    spinner.stop();
    console.log("Something went wrong:", err.message);
  }
};

main();
