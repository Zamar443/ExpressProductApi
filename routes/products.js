const express = require("express");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const router = express.Router();

// Public
router.get("/", (req, res) => {
  res.json({ message: "Get all products" });
});

// Authenticated users
router.post("/", auth, (req, res) => {
  res.status(201).json({ message: "Product created" });
});

// Admin only
router.delete("/:id", auth, authorize("admin"), (req, res) => {
  res.json({ message: "Product deleted" });
});

module.exports = router;
