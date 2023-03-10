const express = require("express");
const router = express.Router();
const refreshTokenHandler = require("./handler/refresh-tokens");

router.post("/", refreshTokenHandler.create);
// get
router.get("/", refreshTokenHandler.getToken);

module.exports = router;
