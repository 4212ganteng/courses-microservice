const express = require("express");
const router = express.Router();
const userHandler = require("./handler/user");
// register
router.post("/", userHandler.register);
// login
router.post("/login", userHandler.login);
router.put("/:id", userHandler.update);
// get By iD
router.get("/:id", userHandler.getById);
// get all
router.get("/", userHandler.getUsers);
// logout
router.post("/logout", userHandler.logout);

module.exports = router;
