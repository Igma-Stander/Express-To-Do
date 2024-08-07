const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { UserInformation, users } = require("../model/userDB");

// Register a new user
router.post("/", (req, res) => {
  const { username, password } = req.body;

  // Validate username and password
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Check if the username already exists
  // const existingUser = userInformation.find(
  //   (user) => user.username === username
  // );
  // if (existingUser) {
  //   return res.status(400).json({ message: "Username already exists" });
  // }

  // Check if username ends with '@gmail.com'
  if (!username.endsWith("@gmail.com")) {
    return res.status(403).json({
      message: "Only usernames ending with '@gmail.com' are allowed",
    });
  }
  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ message: "Error registering user" });
    }

    // Create a new user object
    const newUser = new UserInformation(username, hashedPassword);
    users.push(newUser);
    // Generate a new id
    // id: userInformation.length + 1,
    // username: username,
    // password: hashedPassword, // Store hashed password
    // todos: [], // Initialize with an empty todos array

    // Push the new user to the userDB
    // userInformation.push(newUser);

    res.status(201).json({ message: "User registered successfully" });
  });
});

module.exports = router;
