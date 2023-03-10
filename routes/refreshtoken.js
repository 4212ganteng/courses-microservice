const express = require("express");
const router = express.Router();
const refreshsHandler = require("./handler/refreshToken");

router.post("/", refreshsHandler.refreshToken);

module.exports = router;
