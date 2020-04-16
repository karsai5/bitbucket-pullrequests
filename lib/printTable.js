const Table = require("cli-table3");

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

module.exports = printTable;