const ora = require("ora");
const api = require("./api");
const opn = require('opn');

const openCommand = (program) => {
  program
    .command("open <id>")
    .description("list pull requests")
    .action(async (id, commandObj) => {
      const spinner = ora("Opening pull request 💪").start();
      try {
        const pullRequest = await api.getPullRequest(commandObj.parent.repo, id);
        spinner.succeed();
        opn(pullRequest.links.html.href);

      } catch (err) {
        spinner.fail();
        console.log("Something went wrong:", err.message);
      }
    });
}

module.exports = openCommand;