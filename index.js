const axios = require("axios");
const Table = require("cli-table3");
const ora = require("ora");

const spinner = ora('Loading pull requests 💪');
const instance = axios.create({
  baseURL: "https://api.bitbucket.org/2.0/",
});

const getPullRequests = async () => {
  const result = await instance.get(
    "repositories/atlassian/atlassian-frontend/pullrequests",
    {
      params: {
        q: 'author.nickname="zzarcon" AND state="OPEN"',
      },
      auth: {
        username: process.env.BITBUCKET_USERNAME,
        password: process.env.BITBUCKET_PASSWORD
      }
    }
  );

  return result.data.values;
};

const printTable = (pullRequests) => {
  var table = new Table({
    head: ["ID", "Title", "Author"],
  });

  const tableRows = pullRequests.map((pullRequest) => {
    return [pullRequest.id, pullRequest.title, pullRequest.author.nickname];
  });

  table.push(...tableRows);

  console.log(table.toString());
};

const logPullRequests = (pullRequests) => {
  console.log(
    pullRequests.map((item) => {
      const { id, title, author, description } = item;
      return { id, title, author, description };
    })
  );
};

const main = async () => {
  spinner.start();
  const pullRequests = await getPullRequests();
  spinner.stop();
  printTable(pullRequests);
};

main();
