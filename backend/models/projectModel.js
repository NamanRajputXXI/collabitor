const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["owner", "editor", "viewer"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
