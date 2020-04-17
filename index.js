#!/usr/bin/env node

const ora = require("ora");
const auth = require("./lib/auth");
const printTable = require("./lib/printTable");
const api = require("./lib/api");
const config = require("./lib/config");
const { Command } = require("commander");

const program = new Command();
program.version("0.0.1");

program
  .requiredOption(
    "-r, --repo <atlassian/atlassian-frontend>",
    "the repo you want to list pull requests from",
    config.vars.repo
  )
  .option(
    "-t, --title <search string>",
    "Filter PRs that contain string in title",
    config.vars.title
  )
  .option(
    "-u, --users <user1, user2>",
    "a comma separated list of users you care about",
    config.vars.users
  );

program
  .command("list", {isDefault: true})
  .description("list pull requests")
  .action(async () => {
    const spinner = ora("Getting pull requests 📨").start();
    try {
      const username = auth.getUsername();
      const password = auth.getPassword();

      const pullRequests = await api.getPullRequests(
        username,
        password,
        program
      );
      spinner.succeed();

      printTable(pullRequests);
    } catch (err) {
      spinner.fail();
      console.log("Something went wrong:", err.message);
    }
  });

program.on('--help', () => {
  console.log('');
  console.log(`Bitbucket PullRequests is a CLI utility to help you keep track of open PRs for your team.

AUTHENTICATION
In order to connect to bitbucket you'll have to setup an application password and set the 
${auth.BITBUCKET_USERNAME} and ${auth.BITBUCKET_PASSWORD} environment variables.

CONFIGURATION
It's possible to configure everything via the CLI. But overtime this might become tiresome 
to always type out the same long command. It's also possible to create a ${config.CONFIG_FILE}
config file and to store your configuration defaults in there.
  `);
});

program.parse(process.argv);
