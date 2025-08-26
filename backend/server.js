const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./configs/connect");
const userRoutes = require("./routes/user");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB().catch((err) => console.error("MongoDB connection failed:", err));

app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Collabitor API is running");
});

// No app.listen() here for Vercel
module.exports = app;
