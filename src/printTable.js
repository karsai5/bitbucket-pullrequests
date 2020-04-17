const Table = require("cli-table3");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const config = [
  {
    title: "ID",
    width: 6,
  },
  {
    title: "Title",
    width: "auto",
  },
  {
    title: "Author",
    width: 10,
  },
  {
    title: "💬",
    width: 4,
  },
  {
    title: "✅",
    width: 4,
  },
  {
    title: "Updated",
    width: 11,
  },
  {
    title: "Created",
    width: 11,
  },
];

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const printTable = (pullRequests) => {
  const terminalWidth = process.stdout.columns - 1 - config.length * 2;
  const setWidths = config
    .map((c) => c.width)
    .filter((width) => typeof width === "number")
    .reduce(reducer);
  const numberOfAutos = config
    .map((c) => c.width)
    .filter((width) => width === "auto").length;
  const autoWidth = Math.floor((terminalWidth - setWidths) / numberOfAutos);

  var table = new Table({
    head: config.map((c) => c.title),
    colWidths: config.map((c) => {
      if (c.width !== "auto") {
        return c.width;
      }
      return autoWidth;
    }),
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
