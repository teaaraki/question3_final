// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

// Arrays
let items = ["Buy Food", "Prepare Food", "Cook Food", "Eat Food"];
let finalExamItems = [
  "ICS 360 Project",
  "ICS 200 Website",
  "ICS 385 Exam",
  "BUS 320 Exam",
];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Main List
app.get("/", function (req, res) {
  let day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

// Handle Adding Items
app.post("/", function (req, res) {
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

// Finals List
app.get("/finals", function (req, res) {
  res.render("list", {
    listTitle: "Final Exam To Do List",
    newListItems: finalExamItems,
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
