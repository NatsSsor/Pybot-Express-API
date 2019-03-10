var express = require("express");
var router = express.Router();
const dbActions = require("../Util/DbActions");
const client = new dbActions();
const File = require("../Models/File");
const User = require("../Models/User");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/database");

/* GET users listing. */

router.get("/user", function(req, res, next) {
  const query = req.query;
  User.find(query)
    .then(users => {
      res.json({
        confirmation: "Success",
        data: users
      });
    })
    .catch(err => {
      res.json({
        confirmation: "Failed",
        error: err.message
      });
    });
});

router.get("/file", function(req, res, next) {
  File.create(req.body)
    .then(file => {
      res.json({
        confirmation: "Success",
        data: file
      });
    })
    .catch(err => {
      res.json({
        confirmation: "Failed",
        error: err.message
      });
    });
});

module.exports = router;
