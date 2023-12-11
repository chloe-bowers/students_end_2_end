const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3000;

const pool = new Pool({
  user: "chloebowers",
  host: "localhost",
  database: "students",
  password: "postgres",
  port: 5432,
});

app.use(cors());

app.get("/index", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM students_table");
    res.json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
