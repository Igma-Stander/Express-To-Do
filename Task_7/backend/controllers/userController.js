const { UserInformation, users } = require("../model/userDB");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userController = {
  // Extracting username and password from request body
  userLogin: (req, res) => {
    const { username, password } = req.body;

    // Finding user in the database based on username and password
    const user = users.find((user) => user.username === username);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (!result) {
        return res
          .status(401)
          .json({ message: "Incorrect username or password" });
      }

      // Creating payload for JWT token
      const payload = {
        name: user.username,
        admin: user.admin || false,
      };

      // Generating JWT token with payload and secret key "HyperionDev"
      const token = jwt.sign(payload, "HyperionDev", {
        algorithm: "HS256",
      });

      console.log(`User ${username} logged in`);
      // Sending token back to the client
      res.json({ message: `Welcome back ${username}`, token: token });
    });
  }, // Remove the comma here

  getTodos: (req, res) => {
    // Extracting username from authenticated user
    const { name } = req.user;
    const user = users.find((user) => user.username === name);

    if (user) {
      return res.json(user.todos);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  },

  addTodo: (req, res) => {
    const { name } = req.user;
    // Extracting task from request body
    const { task } = req.body;

    // Finding index of user in the database based on username
    const userIndex = users.findIndex((user) => user.username === name);

    if (userIndex !== -1) {
      // Checking if task length exceeds 140 characters
      if (task.length > 140) {
        return res.status(403).json({ message: "Task exceeds 140 characters" });
      }

      // Adding task to user's todos array
      users[userIndex].todos.push({
        id: users[userIndex].todos.length,
        task: task,
      });
      res.status(200).json({ message: "Task added" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  },

  deleteTodo: (req, res) => {
    const { name } = req.user;
    const todoId = req.params.id;

    // Find the user
    const userIndex = users.findIndex((user) => user.username === name);

    if (userIndex !== -1) {
      // Find the index of the todo item to delete
      const todoIndex = users[userIndex].todos.findIndex(
        (todo) => todo.id === +todoId
      );

      if (todoIndex !== -1) {
        // Remove the todo item
        users[userIndex].todos.splice(todoIndex, 1);
        return res.status(200).json({ message: "Todo item deleted" });
      } else {
        return res.status(404).json({ message: "Todo item not found" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  },

  updateTodo: (req, res) => {
    const { name } = req.user;
    const todoId = req.params.id;
    const updatedTask = req.body.task;

    // Find the user
    const userIndex = users.findIndex((user) => user.username === name);

    if (userIndex !== -1) {
      // Find the index of the todo item to update
      const todoIndex = users[userIndex].todos.findIndex(
        (todo) => todo.id === +todoId
      );

      if (todoIndex !== -1) {
        // Update the task
        users[userIndex].todos[todoIndex].task = updatedTask;
        return res.status(200).json({ message: "Todo item updated" });
      } else {
        return res.status(404).json({ message: "Todo item not found" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  },
};

module.exports = userController;
