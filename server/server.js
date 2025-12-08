require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://marshvegasclient.onrender.com"],
  })
);

// ==================================================
// ===================== ROUTES =====================
// ==================================================
const beachesController = require("./routes/beaches");
app.use("/beaches", beachesController);

// ==================================================
// ==================== LISTENER ====================
// ==================================================
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("API is running.");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));