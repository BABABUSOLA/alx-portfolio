const express = require("express");
const router = require("./routes/index.js");
const cors = require("cors");
const rateLimit = require("express-rate-limit"); // Import express-rate-limit

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 1, // Limit each IP to 1 request per windowMs
  message: "You can only upload one file per day.", // Custom message
  handler: (res) => {
    // Custom error handler for rate limit exceeded
    res.status(429).json({
      success: false,
      message:
        "You can only upload one file per day. Please try again tomorrow.",
    });
  },
});

// Apply the rate limiter to the /api/v1/upload route
app.use("/api/v1/files", limiter);
app.use("/api/v1//files/:fileName", limiter);

// Use the router for all routes under /api/v1
app.use("/api/v1/", router);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
