const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("DB connected successfully");
  }
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json(data);
  });
});

app.get("/student/:id",(req,res)=>{
  const id=req.params.id
  const sql="SELECT * FROM student WHERE ID=?"
  db.query(sql,[id],(err,data)=>{
    if(err) return res.json({msessage:"Erorr....."})
    return res.json(data)
  })
})

app.post("/create", (req, res) => {
  const sql = "INSERT INTO student (Name, Email) VALUES (?)";
  const values = [req.body.name, req.body.email];

  db.query(sql, [values], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(201).json({ message: "Student created", data });
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE student SET Name = ?, Email = ? WHERE ID = ?";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({ message: "Student updated", data });
  });
});

app.delete("/student/:id", (req, res) => {
  const sql = "DELETE FROM student WHERE ID = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({ message: "Student deleted", data });
  });
});


// Start server
app.listen(8081, () => {
  console.log("Server listening on port 8081");
});

