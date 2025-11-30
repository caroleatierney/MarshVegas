require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

// ==================================================
// ===================== ROUTES =====================
// ==================================================
const beachesController = require("./routes/beaches");
app.use("/beaches", beachesController);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://marshvegasclient.onrender.com",
    ],
  })
);

// ==================================================
// ==================== LISTENER ====================
// ==================================================
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("API is running. Try /beaches");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));