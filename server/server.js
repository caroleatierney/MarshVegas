require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const beachesController = require("./routes/beaches");
app.use("/beaches", beachesController);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server running 🎉");
});
