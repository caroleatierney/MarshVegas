const express = require("express");
const router = express.Router();

// Routes
const beachesController = require("./routes/beaches");
app.use("/beaches", beachesController);

// Listener
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
