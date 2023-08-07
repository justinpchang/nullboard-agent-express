const { v4: uuidv4 } = require("uuid");
const { readFile, writeFile, findOrCreateDir } = require("./fs");
const { TOKEN_PATH, BASE_PATH } = require("./constants");

function getToken() {
  const token = readFile(TOKEN_PATH);
  if (token) return token.toString();
  return generateToken();
}

function generateToken() {
  const token = uuidv4();
  if (!findOrCreateDir(BASE_PATH)) return false;
  if (!writeFile(TOKEN_PATH, token)) return false;
  return token;
}

module.exports = {
  getToken,
  generateToken,
};
