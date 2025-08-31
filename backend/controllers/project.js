const Project = require("../models/projectModel");

const create = async (req, res) => {
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

const view = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findById(projectId).populate(
      "members.user",
      "username email"
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const edit = async (req, res) => {
  try {
    const projectId = req.params.id;
    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }
    const { name, description, members } = req.body;
    if (!name && !description && !members) {
      return res.status(400).json({
        message:
          "At least one field (name, description, members) is required to update",
      });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // Only owner can edit
    const isOwner = project.members.some(
      (member) =>
        member.user.toString() === req.user.id && member.role === "owner"
    );
    if (!isOwner) {
      return res
        .status(403)
        .json({ message: "Only owner can edit the project" });
    }
    project.name = name || project.name;
    project.description = description || project.description;
    if (members) {
      const owner = project.members.find((m) => m.role === "owner");
      project.members = [owner, ...members];
    }
    await project.save();
    await project.populate("members.user", "username email");
    res.status(200).json({ message: "Project updated", project });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOne = async (req, res) => {
  try {
    const projectId = req.params.id;
    console.log(projectId, "this is the project id");

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // Only owner can delete
    const isOwner = project.members.some(
      (member) =>
        (member.user._id || member.user).toString() === req.user.id &&
        member.role === "owner"
    );
    console.log(isOwner, "is owner");

    if (!isOwner) {
      return res
        .status(403)
        .json({ message: "Only owner can delete the project" });
    }
    await project.deleteOne();
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAll = async (req, res) => {
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

module.exports = { create, getAll, view, edit, deleteOne };
