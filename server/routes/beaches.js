const express = require("express");
const router = express.Router();
const pool = require("../db");

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({ ok: true });
});

// GET all beaches
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM beaches");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const {
      name,
      photo,
      photo_credit,
      access,
      parking,
      hours,
      avail_rec,
      notes,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO beaches 
      (name, photo, photo_credit, access, parking, hours, avail_rec, notes)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *`,
      [name, photo, photo_credit, access, parking, hours, avail_rec, notes]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("POST /beaches error", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/tides", async (req, res) => {
  try {
    const { lat, long } = req.query;

    const apiKey = process.env.STORMGLASS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing Stormglass API key" });
    }

    const today = new Date();
    const yyyyMmDd = today.toISOString().split("T")[0];

    const start = `${yyyyMmDd}T00:00:00Z`;
    const end = `${yyyyMmDd}T23:59:59Z`;

    const response = await fetch(
      `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${long}&start=${start}&end=${end}`,
      {
        headers: {
          Authorization: apiKey,
        },
      },
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error("GET /beaches/tides error", err);
    res.status(500).json({ error: "Failed to fetch tides" });
  }
});

// UPDATE A BEACH
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;

    const result = await pool.query(
      `UPDATE beaches
       SET name=$1, photo=$2, photo_credit=$3, access=$4, parking=$5, 
           hours=$6, avail_rec=$7, notes=$8
       WHERE id=$9
       RETURNING *`,
      [
        fields.name,
        fields.photo,
        fields.photo_credit,
        fields.access,
        fields.parking,
        fields.hours,
        fields.avail_rec,
        fields.notes,
        id,
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT /beaches error", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE A BEACH
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM beaches WHERE id=$1", [id]);

    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /beaches error", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;