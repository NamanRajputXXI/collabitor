const express = require("express");
const router = express.Router();
const { getProject, createProject } = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");

router.post("/create", authMiddleware, createProject);
router.get("/getAl", authMiddleware, getProject);
