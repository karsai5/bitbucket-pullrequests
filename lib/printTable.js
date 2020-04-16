const Table = require("cli-table3");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const printTable = (pullRequests) => {
  var table = new Table({
    head: ["ID", "Title", "Author", "💬", "✅", "Updated", "Created"],
  });

  const tableRows = pullRequests.map((pullRequest) => {
    return [
      pullRequest.id,
      pullRequest.title,
      pullRequest.author.nickname,
      pullRequest.comment_count,
      pullRequest.task_count,
      dayjs(pullRequest.updated_on).fromNow(),
      dayjs(pullRequest.created_on).fromNow(),
    ];
  });

  table.push(...tableRows);

  console.log(table.toString());
};

module.exports = printTable;
