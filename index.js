const ora = require("ora");
const auth = require("./lib/auth");
const printTable = require("./lib/printTable");
const api = require("./lib/api");

const spinner = ora("Loading pull requests 💪");

const main = async () => {
  try {
    const username = auth.getUsername();
    const password = auth.getPassword();
    const repo = "atlassian/atlassian-frontend";
    const users = ["zzarcon", "Linus Karsai"];

    spinner.start();
    const pullRequests = await api.getPullRequests(
      username,
      password,
      repo,
      users
    );
    spinner.stop();

    printTable(pullRequests);
  } catch (err) {
    spinner.stop();
    console.log("Something went wrong:", err.message);
  }
};

main();
