const express = require("express");
const router = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} = require("../../controllers/userController");
const {
  jwtMiddleware,
  rejectLongTask,
  rejectNonJSON,
} = require("../../middleware/jwtMiddleware");

// GET request to /todos endpoint with jwtMiddleware and getTodos function
router.get("/", jwtMiddleware, getTodos);
// POST request to /todos endpoint with jwtMiddleware, rejectLongTask, rejectNonJSON, and addTodo function
router.post("/", jwtMiddleware, rejectLongTask, rejectNonJSON, addTodo);
router.delete("/:id", jwtMiddleware, deleteTodo);
router.put("/:id", jwtMiddleware, updateTodo);
// Was /todos

module.exports = router;
