//fixed the Router.use() problem
const express = require("express");
const router = express.Router();
const users = require("../controllers/userController");

router.post("/", users.userLogin);

module.exports = router;
