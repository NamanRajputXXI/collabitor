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
