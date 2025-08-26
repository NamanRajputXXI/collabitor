const Project = require("../models/projectModel");

const createProject = async (req, res) => {
  const { name, description, members } = req.body;

  try {
    // The creator is automatically the owner
    const ownerId = req.user.id; // from authMiddleware

    const projectMembers = [
      { user: ownerId, role: "owner" },
      ...(members || []),
    ];

    const newProject = await Project.create({
      name,
      description,
      members: projectMembers,
    });

    // we tell mongoose to populate the user field in members with username and email
    await newProject.populate("members.user", "username email");

    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getProjects = async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware

    // Find projects where the user is a member
    const projects = await Project.find({ "members.user": userId }).populate(
      "members.user",
      "username email"
    );

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createProject, getProjects };
