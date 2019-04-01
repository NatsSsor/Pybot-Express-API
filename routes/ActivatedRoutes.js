const person = require("../Models/Person");
const activated = require("../Models/Activated");
const express = require("express");
const router = express.Router();
let Deactivated = false;

const mongoose = require("mongoose");
//("mongodb://den1.mongo1.gear.host:27001/pibotdb");

//"mongodb://pibotdb:password1!@den1.mongo1.gear.host:27001/pibotdb"
const connstring = "mongodb://den1.mongo1.gear.host:27001/pibotdb";
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
};

// Connect to the db
/* MongoClient.connect(connstring2, function(err, db) {
  if (err) throw err;

  //Write databse Insert/Update/Query code here..
}); */

mongoose.connect(connstring, options, (err, database) => {
  if (err) return console.log(err);
  else console.log("connected to mongo successfully");
});
const InitialData = { activated: true };
router.post("/Init", function(req, res, next) {
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
});

module.exports = router;
