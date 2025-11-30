require("dotenv").config();
const { Client } = require("pg");

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is missing from .env");
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

client
  .connect()
  .then(() => console.log("✅ Connected to Neon PostgreSQL"))
  .catch((err) => console.error("❌ Connection error:", err));

module.exports = client;