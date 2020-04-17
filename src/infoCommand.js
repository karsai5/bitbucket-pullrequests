const ora = require("ora");
const api = require("./api");
const opn = require('opn');

const openCommand = (program) => {
  program
    .command("info <id>")
    .description("show info about pull request")
    .action(async (id, commandObj) => {
      const spinner = ora("Getting info about pull request 📝").start();
      try {
        const pullRequest = await api.getPullRequest(commandObj.parent.repo, id);
        spinner.succeed();
        console.log(pullRequest);

      } catch (err) {
        spinner.fail();
        console.log("Something went wrong:", err.message);
      }
    });
}

module.exports = openCommand;