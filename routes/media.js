const express = require("express");
const router = express.Router();
const mediaHandler = require("./handler/media");

router.post("/", mediaHandler.create);
// get all
router.get("/", mediaHandler.getall);
router.delete("/:id", mediaHandler.destroy);

module.exports = router;
