const ora = require("ora");
const printTable = require("./printTable");
const api = require("./api");
const config = require("./config");

const listCommand = (program) => {
  program
    .command("list", { isDefault: true })
    .description("list pull requests")
    .option(
      "-t, --title <search string>",
      "Filter PRs that contain string in title",
      config.vars.title
    )
    .option(
      "-u, --users <user1, user2>",
      "a comma separated list of users you care about",
      config.vars.users
    )
    .action(async (commandObj) => {
      const spinner = ora("Getting pull requests 📨").start();
      try {
        const pullRequests = await api.getPullRequests(commandObj.parent.repo, commandObj.users, commandObj.title);
        spinner.succeed();

        printTable(pullRequests);
      } catch (err) {
        spinner.fail();
        console.log("Something went wrong:", err.message);
      }
    });
};

module.exports = listCommand;
