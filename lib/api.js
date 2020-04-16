const axios = require("axios");
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

module.exports = {
  getPullRequests,
};
