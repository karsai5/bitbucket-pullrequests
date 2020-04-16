const ora = require("ora");
const auth = require("./lib/auth");
const printTable = require("./lib/printTable");
const api = require("./lib/api");
const { Command } = require("commander");

const program = new Command();
program.version("0.0.1");

program
  .requiredOption(
    "-r, --repo <atlassian/atlassian-frontend>",
    "the repo you want to list pull requests from"
  )
  .option(
    "-u, --users <user1, user2>",
    "a comma separated list of users you care about"
  );

program.parse(process.argv);

const spinner = ora("Loading pull requests 💪");

const main = async () => {
  try {
    const username = auth.getUsername();
    const password = auth.getPassword();

    spinner.start();
    const pullRequests = await api.getPullRequests(username, password, program);
    spinner.stop();

    printTable(pullRequests);
  } catch (err) {
    spinner.stop();
    console.log("Something went wrong:", err.message);
  }
};

main();
