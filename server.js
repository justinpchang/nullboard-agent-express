import express from "express";
import cors from "cors";
import fs from "fs-extra";

const BASE_PATH = "dev-agent/";
//const BASE_PATH = "/opt/nullboard-agent/";
const APP_CONFIG_FILENAME = "app-config.json";
const BOARD_META_FILENAME = "meta.json";
const DELETED_BOARDS_DIR = "$DeletedBoards";
const DELETED_BOARDS_PATH = BASE_PATH + DELETED_BOARDS_DIR;

const app = express();
const port = 10001;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

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

app.listen(port, () => {
  console.log(`Nullboard agent listening on port ${port}`);
});

/**
 * FILE HELPERS
 */

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
