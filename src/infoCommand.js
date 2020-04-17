const ora = require("ora");
const api = require("./api");
const chalk = require("chalk");
const dayjs = require("dayjs");

const openCommand = (program) => {
  program
    .command("info <id>")
    .description("show info about pull request")
    .action(async (id, commandObj) => {
      const detailsSpinner = ora("Getting info about pull request 📝");
      const filesSpinner = ora("Getting file diffs");

      try {
        const prAsync = api.getPullRequest(commandObj.parent.repo, id);
        const diffStatAsync = api.getPullRequestDiffStat(
          commandObj.parent.repo,
          id
        );

        detailsSpinner.start();
        const pr = await prAsync;
        detailsSpinner.stop();

        const reviewers = pr.reviewers
          ? pr.reviewers.map((r) => r.display_name).join(", ")
          : "";
        const createdOn = `${dayjs(pr.created_on).format(
          "D MMM YYYY"
        )} (${dayjs(pr.created_on).fromNow()})`;

        console.log(`
${chalk.bgWhite(chalk.black("Details"))}
Title: ${chalk.underline(pr.title)}
Author: ${pr.author.display_name}
Reviewers: ${reviewers}

Created on: ${createdOn}
Last updated: ${dayjs(pr.updated_on).fromNow()}
        `);

        console.log(chalk.bgWhite(chalk.black("File Changes")));
        filesSpinner.start();
        const diffStat = await diffStatAsync;
        filesSpinner.stop();
        diffStat.values.forEach((change) => {
          if (change.status === "added") {
            console.log(`A ${chalk.yellow(change.new.path)}`);
          } else if (change.status === "modified") {
            console.log(
              `M ${chalk.cyan(change.new.path)} (-${change.lines_removed}, +${
                change.lines_added
              })`
            );
          } else if (change.status === "removed") {
            console.log(`D ${chalk.red(change.old.path)}`);
          } else {
            console.log(
              `${change.status} ${chalk.gray(
                change.old ? change.old.path : change.new.path
              )}`
            );
          }
        });
      } catch (err) {
        detailsSpinner.fail();
        console.log("Something went wrong:", err.message);
      }
    });
};

module.exports = openCommand;
