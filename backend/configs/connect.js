// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1); // stops server if DB connection fails
//   }
// };

// module.exports = { connectDB };

const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      socketTimeoutMS: 45000,
      bufferCommands: false, // Disable mongoose buffering
    });

    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

module.exports = { connectDB };
