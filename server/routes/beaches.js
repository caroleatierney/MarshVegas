const express = require("express");
const router = express.Router();
const postgres = require("../postgres"); // or your model

// GET all beaches
router.get("/", async (req, res) => {
  try {
    const result = await postgres.query("SELECT * FROM beaches");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one beach
router.get("/:id", (req, res) => {
  const beach = beaches.find((b) => b.id == req.params.id);
  if (!beach) return res.status(404).json({ error: "Not found" });
  res.json(beach);
});

module.exports = router;