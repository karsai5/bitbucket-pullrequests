const axios = require("axios");
const Table = require("cli-table3");
const ora = require("ora");
const auth = require("./lib/auth");

const spinner = ora("Loading pull requests 💪");
const instance = axios.create({
  baseURL: "https://api.bitbucket.org/2.0/",
});
const getPullRequests = async (username, password) => {
  const result = await instance.get(
    "repositories/atlassian/atlassian-frontend/pullrequests",
    {
      params: {
        q: 'author.nickname="zzarcon" AND state="OPEN"',
      },
      auth: {
        username: username,
        password: password,
      },
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
  try {
    const username = auth.getUsername();
    const password = auth.getPassword();

    spinner.start();
    const pullRequests = await getPullRequests(username, password);
    spinner.stop();

    printTable(pullRequests);
  } catch (err) {
    spinner.stop();
    console.log("Something went wrong:", err.message);
  }
};

main();
