const BASE_PATH =
  process.env.ENV === "development" ? "dev-agent/" : "/opt/nullboard-agent/";

module.exports = {
  BASE_PATH,
  APP_CONFIG_FILENAME: "app-config.json",
  BOARD_META_FILENAME: "meta.json",
  DELETED_BOARDS_PATH: BASE_PATH + "$DeletedBoards",
  TOKEN_PATH: BASE_PATH + "token.txt",
};
