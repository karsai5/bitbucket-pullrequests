const axios = require("axios");
const instance = axios.create({
  baseURL: "https://api.bitbucket.org/2.0/",
});
const auth = require("./auth");

const generateNicknameQuery = (users) => {
  if (!users) return "";
  const nicknameString = users
    .split(",")
    .map((nickname) => {
      return `author.nickname="${nickname}"`;
    })
    .join(" OR ");

  return `(${nicknameString}) AND `;
};

generateTitleQuery = (titleSearchString) => {
  if (!titleSearchString) return "";
  return `title~"${titleSearchString}" AND `;
};

const getPullRequests = async (repo, users, title) => {
  const username = auth.getUsername();
  const password = auth.getPassword();

  const result = await instance.get(`repositories/${repo}/pullrequests`, {
    params: {
      q: `${generateNicknameQuery(users)}${generateTitleQuery(
        title
      )} state="OPEN"`,
      sort: "-updated_on",
    },
    auth: {
      username: username,
      password: password,
    },
  });

  return result.data.values;
};

const getPullRequest = async (repo, id) => {
  const username = auth.getUsername();
  const password = auth.getPassword();

  const result = await instance.get(`repositories/${repo}/pullrequests/${id}/`, {
    auth: {
      username: username,
      password: password,
    },
  });
  return result.data;
}

const getPullRequestDiffStat = async (repo, id) => {
  const username = auth.getUsername();
  const password = auth.getPassword();

  const result = await instance.get(`repositories/${repo}/pullrequests/${id}/diffstat`, {
    auth: {
      username: username,
      password: password,
    },
  });
  return result.data;
}

const getPullRequestComments = async (repo, id) => {
  const username = auth.getUsername();
  const password = auth.getPassword();

  const result = await instance.get(`repositories/${repo}/pullrequests/${id}/comments`, {
    auth: {
      username: username,
      password: password,
    },
  });
  return result.data;
}

module.exports = {
  getPullRequests,
  getPullRequest,
  getPullRequestDiffStat,
  getPullRequestComments,
};
