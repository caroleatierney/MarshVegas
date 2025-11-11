const express = require("express");
const router = express.Router();
const Beaches = require("../models/marshVegasBeaches");

// GET all beaches
router.get("/", async (req, res) => {
  try {
    const beaches = await Beaches.all();
    res.json(beaches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// CREATE a beach
router.post("/", async (req, res) => {
  try {
    const beach = await Beaches.create(req.body);
    res.json(beach);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// UPDATE a beach
router.put("/:id", async (req, res) => {
  try {
    req.body.id = req.params.id;
    const beach = await Beaches.update(req.body);
    res.json(beach);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE a beach
router.delete("/:id", async (req, res) => {
  try {
    await Beaches.delete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;