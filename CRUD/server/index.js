const express = require("express");
const sql = require('mysql');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001;

// database
var db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'social_media_react'
});

// ROUTING

//Read
app.get("/user/read", (req, res) => {

    let query = "SELECT * FROM student";
    db.query(query, (err, result) => {
        err ? res.send(err) : res.json(result);
    })
});
// create
app.post("/user/create", (req, res) => {
    let name = req.body.info.name;
    let email = req.body.info.email;
    let phone = req.body.info.phone;

    let query = "INSERT INTO student(name, email, phone) VALUES (?,?,?)";
    db.query(query, [name, email, phone], (err, result) => {
        err ? res.send(err) : res.send(result.data);
    })
});

// update
app.patch("/user/update", (req, res) => {
    let id = req.body.info.id;
    let name = req.body.info.name;
    let email = req.body.info.email;
    let phone = req.body.info.phone;

    let query = "UPDATE `student` SET `name` = ?, `email` = ?, `phone` = ? WHERE `sid` = ?";
    db.query(query, [name, email, phone, id], (err, result) => {
        err ? console.log(err) : "";
    })
});
// delete
app.delete("/user/delete/", (req, res) => {
    let id = req.query.id;
    let query = "DELETE FROM student WHERE sid = ?";
    db.query(query, id, (err, result) => {
        err ? console.log(err) : "";
    })
});



// running server
app.listen(port, (err) => {
    (err && console.log(err))
    console.log("Running On Port", port);
});