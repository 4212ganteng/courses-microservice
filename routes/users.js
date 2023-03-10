const express = require("express");
const router = express.Router();
const usersHandler = require("./handler/users");
const verifyJwt = require("../middleware/verifyJwt");

// register
router.post("/register", usersHandler.register);
// login
router.post("/login", usersHandler.login);
// logout
router.post("/logout", verifyJwt, usersHandler.logout);
router.put("/", verifyJwt, usersHandler.update);
// get by iud
router.get("/", verifyJwt, usersHandler.getUserId);

module.exports = router;
