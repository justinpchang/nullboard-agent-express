const fs = require("fs-extra");

function readFile(path) {
  try {
    return fs.readFileSync(path);
  } catch (_) {
    return false;
  }
}

function writeFile(path, data) {
  try {
    fs.writeFileSync(path, data);
    return true;
  } catch (_) {
    return false;
  }
}

function findOrCreateDir(dir) {
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    return true;
  } catch (_) {
    return false;
  }
}

function dirExists(dir) {
  try {
    return fs.existsSync(dir);
  } catch (_) {
    return false;
  }
}

function moveDir(src, dest) {
  try {
    fs.moveSync(src, dest, { overwrite: true });
    return true;
  } catch (_) {
    return false;
  }
}

module.exports = {
  readFile,
  writeFile,
  findOrCreateDir,
  dirExists,
  moveDir,
};
