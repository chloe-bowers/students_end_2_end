const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");

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
app.use(bodyParser.json());

app.get("/index", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM students_table");
    res.json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/index", async (req, res) => {
  const { first_name, last_name, check_in_time } = req.body;

  console.log(req.body);
  if (!first_name || !last_name || !check_in_time) {
    return res
      .status(400)
      .send(
        "Error missing data"
      );
  }

  try {
    const query = `
      INSERT INTO students_table (first_name, last_name, check_in_time)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const values = [first_name, last_name, check_in_time];

    const result = await pool.query(query, values);
    res
      .status(201)
      .send({ message: "New Student created", studentId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Some error has occurred");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
