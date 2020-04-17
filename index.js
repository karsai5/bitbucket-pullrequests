#!/usr/bin/env node

const auth = require("./src/auth");
const config = require("./src/config");
const { Command } = require("commander");
const listCommand = require("./src/listCommand");
const openCommand = require("./src/openCommand");

const program = new Command();
program.version("0.0.1");
program.requiredOption(
  "-r, --repo <atlassian/atlassian-frontend>",
  "the repo you want to list pull requests from",
  config.vars.repo
);

listCommand(program);
openCommand(program);

program.on("--help", () => {
  console.log("");
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
