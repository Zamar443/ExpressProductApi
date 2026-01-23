const express = require("express");
const router = express.Router();
const { fetchAndSaveTodo } = require("../controllers/todoController");

router.get("/external-todo", fetchAndSaveTodo);

module.exports = router;
