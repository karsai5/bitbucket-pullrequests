const BITBUCKET_USERNAME = "BITBUCKET_USERNAME";
const BITBUCKET_PASSWORD = "BITBUCKET_PASSWORD";

const getUsername = () => {
  const username = process.env[BITBUCKET_USERNAME];
  if (!username) {
    throw new Error(
      `No username! Make sure you've set ${BITBUCKET_USERNAME} in your env variables.`
    );
  }
  return username;
};

const getPassword = () => {
  const password = process.env[BITBUCKET_PASSWORD];
  if (!password) {
    throw new Error(
      `No password! Make sure you've set ${BITBUCKET_PASSWORD} in your env variables.`
    );
  }
  return password;
};

module.exports = {
  getPassword,
  getUsername,
  BITBUCKET_PASSWORD,
  BITBUCKET_USERNAME,
};
