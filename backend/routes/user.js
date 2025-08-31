const express = require("express");
const router = express.Router();
const {
  signin,
  signup,
  getProfile,
  getUserList,
} = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", authMiddleware, getProfile);
router.get("/getAll", authMiddleware, getUserList);

module.exports = router;
