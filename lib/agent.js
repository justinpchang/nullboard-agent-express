const { writeFile, findOrCreateDir, dirExists, moveDir } = require("./fs.js");
const {
  BASE_PATH,
  APP_CONFIG_FILENAME,
  BOARD_META_FILENAME,
  DELETED_BOARDS_PATH,
} = require("./constants.js");

const express = require("express");
const cors = require("cors");
const { getToken } = require("./token.js");

const app = (module.exports = express());

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const { "x-access-token": token } = req.headers;
  if (token !== getToken()) {
    res.status(401).send("Unauthorized");
    return;
  }
  next();
});

app.put("/config", (req, res) => {
  console.log("PUT /config ", req.body);

  // Health check does not send conf
  if (req.body.conf) {
    if (!writeFile(BASE_PATH + APP_CONFIG_FILENAME, req.body.conf)) {
      res.status(500).send("Saving config to file failed");
      return;
    }
  }

  res.status(200).send(true);
});

app.put("/board/:id", (req, res) => {
  console.log(`PUT /board/${req.params.id}`, req.body);

  const id = req.params.id;
  const { data, meta } = req.body;

  if (!isValidIdent(id)) {
    res.status(400).send("Invalid board ID");
    return;
  }

  const boardDir = BASE_PATH + id;

  if (!findOrCreateDir(boardDir)) {
    res.status(500).send(`Failed to create board directory ${boardDir}`);
    return;
  }

  if (meta) {
    if (!writeFile(boardDir + "/" + BOARD_META_FILENAME, meta)) {
      res.status(500).send(`Failed to save board meta file`);
      return;
    }
  }

  if (data) {
    let boardData = parseBoardData(data);

    if (!boardData) {
      res.status(400).send("Bad board data");
      return;
    }

    const revision = boardData.revision;

    if (!revision) {
      res.status(400).send("No revision in board data");
      return;
    }

    if (!isValidIdent(revision)) {
      res.status(400).send("Bad board revision");
      return;
    }

    const revisionFilename = `rev-${revision}.nbx`;
    const revisionPath = boardDir + "/" + revisionFilename;

    if (!writeFile(revisionPath, data)) {
      res.status(500).send(`Failed to save board data file`);
      return;
    }
  }

  res.status(200).send(true);
});

app.delete("/board/:id", (req, res) => {
  console.log(`DELETE /board/${req.params.id}`);

  const id = req.params.id;

  if (!isValidIdent(id)) {
    res.status(400).send("Invalid board ID");
    return;
  }

  const boardDir = BASE_PATH + id;

  if (!dirExists) {
    res.status(400).send("Non-existent board");
    return;
  }

  if (!findOrCreateDir(DELETED_BOARDS_PATH)) {
    res.status(500).send(`Failed to create deleted boards directory`);
    return;
  }

  const deletedBoardDir = DELETED_BOARDS_PATH + "/" + id;

  if (!moveDir(boardDir, deletedBoardDir)) {
    res.status(500).send(`Failed to move board directory to deleted boards`);
    return;
  }

  res.status(200).send(true);
});

module.exports = app;

/**
 * MISC HELPERS
 */

function isValidIdent(value) {
  return /^-?\d+$/.test(value);
}

function parseBoardData(raw) {
  try {
    JSON.parse(raw);
    return JSON.parse(raw);
  } catch (_) {
    return false;
  }
}
