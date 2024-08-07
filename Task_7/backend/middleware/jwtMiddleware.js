const jwt = require("jsonwebtoken");

function jwtMiddleware(req, res, next) {
  // Extract JWT token from Authorization header
  const jwtToken = req.headers["authorization"];

  // Check if JWT token exists
  if (!jwtToken) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Extract the token without the "Bearer " prefix
    const token = jwtToken.split(" ")[1];

    // Verify the token
    const payload = jwt.verify(token, "HyperionDev");

    // Reject requests with usernames not containing '@gmail.com'
    if (!payload.name.endsWith("@gmail.com")) {
      return res.status(403).json({
        message: "Only usernames ending with '@gmail.com' are allowed",
      });
    }
    req.user = payload;
    // Call next middleware
    next();
  } catch (error) {
    // Handle invalid token
    console.error("JWT verification error:", error);
    res.status(403).json({ message: "Invalid token" });
  }
}

// Middleware functions
function rejectLongTask(req, res, next) {
  const { task } = req.body;
  if (task.length > 140) {
    return res.status(403).json({ message: "Task exceeds 140 characters" });
  }
  next();
}

function rejectNonJSON(req, res, next) {
  if (!req.is("application/json")) {
    return res
      .status(403)
      .json({ message: "Request must be of JSON data type" });
  }
  next();
}

module.exports = {
  jwtMiddleware,
  rejectLongTask,
  rejectNonJSON,
};
