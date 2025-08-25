const express = require("express");
const router = express.Router();
const { signin, signup, getProfile } = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
