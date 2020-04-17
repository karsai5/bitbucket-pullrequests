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

  return `(${nicknameString}) AND `;
};

generateTitleQuery = (titleSearchString) => {
  if (!titleSearchString) return "";
  return `title~"${titleSearchString}" AND `;

};

const getPullRequests = async (username, password, program) => {
  const result = await instance.get(
    `repositories/${program.repo}/pullrequests`,
    {
      params: {
        q: `${generateNicknameQuery(program.users)}${generateTitleQuery(program.title)}state="OPEN"`,
        sort: "-updated_on",
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
