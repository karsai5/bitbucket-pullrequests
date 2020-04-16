const axios = require("axios");
const instance = axios.create({
  baseURL: "https://api.bitbucket.org/2.0/",
});

const getPullRequests = async (username, password, repo, users) => {
  const nicknameString = users.map(nickname => {
    return `author.nickname="${nickname}"`;
  }).join(' OR ');

  const result = await instance.get(
    `repositories/${repo}/pullrequests`,
    {
      params: {
        q: `(${nicknameString}) AND state="OPEN"`,
        sort: '-created_on'
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
