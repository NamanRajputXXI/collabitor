const express = require("express");
const router = express.Router();
const {
  create,
  getAll,
  view,
  edit,
  deleteOne,
} = require("../controllers/project");
const authMiddleware = require("../middlewares/auth");

router.post("/create", authMiddleware, create);
router.get("/view/:id", authMiddleware, view);
router.get("/getAll", authMiddleware, getAll);
router.put("/edit/:id", authMiddleware, edit);
router.delete("/delete/:id", authMiddleware, deleteOne);

module.exports = router;
