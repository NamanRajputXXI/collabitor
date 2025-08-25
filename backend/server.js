const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./configs/connect");
const userRoutes = require("./routes/user");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Collabitor API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const { connectDB } = require("./configs/connect");
// const userRoutes = require("./routes/user");

// dotenv.config();

// const app = express();

// // CORS configuration
// app.use(cors());

// app.use(express.json());

// // Test routes first
// app.get("/", (req, res) => {
//   res.json({
//     message: "Collabitor API is running",
//     timestamp: new Date().toISOString(),
//   });
// });

// // Routes with database connection
// app.use(
//   "/api/v1/users",
//   async (req, res, next) => {
//     try {
//       await connectDB();
//       next();
//     } catch (error) {
//       console.error("Database connection failed:", error);
//       res.status(500).json({
//         message: "Database connection failed",
//         error: error.message,
//       });
//     }
//   },
//   userRoutes
// );

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;
