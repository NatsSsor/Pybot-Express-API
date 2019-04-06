const person = require("../Models/Person");
const activated = require("../Models/Activated");
const express = require("express");
const router = express.Router();
var verifyLoggedIn = require("./VerifyToken");

let Deactivated = false;

const mongoose = require("mongoose");

const connstring = "mongodb://den1.mongo1.gear.host:27001/pibotdb";//Gearhost mongo instance connection string
const connstring2 =
  "mongodb://pibotdb:password1!@den1.mongo1.gear.host:27001/pibotdb"; //,{dbname: 'pibotdb'};
const options = {
  auth: {
    authSource: "pibotdb"
  },
  user: "pibotdb",
  pass: "password1!",
  useNewUrlParser: true,
  connectTimeoutMS: 4000000
};//MongoDB connection options, since it wouldnt work with normal username / password connection

mongoose.connect(connstring, options, (err, database) => {
  if (err) return console.log(err);
  else console.log("connected to mongo successfully");
});//connection to db


const InitialData = { isActivated: true };
router.post("/Init", verifyLoggedIn, function(req, res, next) {
  console.log(InitialData);
  activated
    .create(InitialData)
    .then(user => {
      console.log(user);
      res.json({
        confirmation: "Success",
        data: user
      });
    })
    .catch(err => {
      res.json({
        confirmation: "Failed",
        error: err.message
      });
    });
});//route to initialise the Activates collection

module.exports = router;
