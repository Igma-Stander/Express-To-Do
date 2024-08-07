const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;

const { jwtMiddleware } = require("./middleware/jwtMiddleware");

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());

// Routes
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const userDataRoute = require("./routes/secure/userDataRoute");
// const myLoggerRoute = require("./routes/myLoggerRoute");

// Register routes
app.use("/register", registerRoute);
// app.use("/", myLoggerRoute);

// Login route
app.use("/login", loginRoute);

// Middleware to check if user is logged in
app.use("/login/data", jwtMiddleware);
// User data routes
//replaced /login/data with /todos because there was no instance for /todod...not sure is correct
app.use("/todos", jwtMiddleware, userDataRoute);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
