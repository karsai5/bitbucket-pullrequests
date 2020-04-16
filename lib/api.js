const axios = require("axios");
const instance = axios.create({
  baseURL: "https://api.bitbucket.org/2.0/",
});

const generateNicknameQuery = (users) => {
  if (!users) return "";
  const nicknameString = users
    .split(",")
    .map((nickname) => {
      return `author.nickname="${nickname}"`;
    })
    .join(" OR ");

  return `(${nicknameString}) AND`;
};

const getPullRequests = async (username, password, program) => {
  const result = await instance.get(
    `repositories/${program.repo}/pullrequests`,
    {
      params: {
        q: `${generateNicknameQuery(program.users)} state="OPEN"`,
        sort: "-created_on",
      },
      auth: {
        username: username,
        password: password,
      },
    }
  );

  return result.data.values;
};

module.exports = {
  getPullRequests,
};
