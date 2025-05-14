// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

// Arrays
let items = ["Buy Food", "Prepare Food", "Cook Food", "Eat Food"];
let workItems = ["Show Up"];
let funItems = ["Watch TV", "Read a Book"];
let finalExamItems = ["ICS 360", "ICS 200", "ICS 385", "BUS 320"];

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
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else if (req.body.list === "Fun") {
    funItems.push(item);
    res.redirect("/fun");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

// Other Lists
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work To Do List", newListItems: workItems });
});

app.get("/fun", function (req, res) {
  res.render("list", { listTitle: "Fun To Do List", newListItems: funItems });
});

// New Finals Route
app.get("/finals", function (req, res) {
  res.render("list", {
    listTitle: "Final Exam To Do List",
    newListItems: finalExamItems,
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
