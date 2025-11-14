require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

// ==================================================
// ===================== ROUTES =====================
// ==================================================
const marshVegasBeachesController = require("./routes/marshVegasBeaches");
app.use("/marshVegasBeaches", marshVegasBeachesController);

// ==================================================
// ==================== LISTENER ====================
// ==================================================
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("API is running. Try /marshVegasBeaches");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
