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

const InitialData = [
  {
    Name: "Ross",
    IsPresent: false
  },
  {
    Name: "Shane",
    IsPresent: false
  },
  {
    Name: "Dan",
    IsPresent: false
  },
  {
    Name: "Matt",
    IsPresent: false
  },
  {
    Name: "Unknown",
    IsPresent: false
  }
];
//Store the initial 5 people in the room
router.post("/Init", function(req, res, next) {
  console.log(InitialData);
  person
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

//CRUD Create
router.post("/Create", function(req, res, next) {
  person
    .create(req.body)
    .then(user => {
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

//CRUD Read
router.get("/View", function(req, res, next) {
  const query = req.query;
  person
    .find(query)
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

//CRUD Update
router.put("/Update", function(req, res, next) {
  const query = req.query;
  console.log(query);
  person
    .findOneAndUpdate(query, req.body)
    .then(people => {
      res.json({
        confirmation: "Success",
        data: people,
        changed: req.body
      });
    })
    .catch(err => {
      res.json({
        confirmation: "Failed",
        error: err.message
      });
    });
});

//CRUD Delete
router.delete("/Delete", function(req, res, next) {
  const query = req.query;
  console.log(query);
  person
    .findOneAndDelete(query, req.body)
    .then(people => {
      res.json({
        confirmation: "Success",
        data: req.query
      });
    })
    .catch(err => {
      res.json({
        confirmation: "Failed",
        error: err.message
      });
    });
});

//Endpoint to get all present people and return an error if deactivated
router.get("/Present", function(req, res, next) {
  if (
    !activated.find().then(result => {
      return result[0].isActivated;
    })
  ) {
    res.json({
      confirmation: "Error",
      reason:
        "API is currently deactivated, please re-enable if you wish to see who is in the room"
    });
    return;
  }

  person
    .find({ IsPresent: true })
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

//register someone as present
router.put("/IsPresent", function(req, res, next) {
  const query = req.query;
  console.log(query);

  const present = { IsPresent: true };
  person
    .findOneAndUpdate(query, present)
    .then(people => {
      res.json({
        confirmation: "Success",
        data: people,
        changed: present
      });
    })
    .catch(err => {
      res.json({
        confirmation: "Failed",
        error: err.message
      });
    });
});

//register someone has left the room
router.put("/HasLeft", function(req, res, next) {
  const query = req.query;
  console.log(query);

  const present = { IsPresent: false };
  person
    .findOneAndUpdate(query, present)
    .then(people => {
      res.json({
        confirmation: "Success",
        data: people,
        changed: present
      });
    })
    .catch(err => {
      res.json({
        confirmation: "Failed",
        error: err.message
      });
    });
});

//Endpoint to disable deactivated mode
router.put("/Activate", function(req, res, next) {
  activated
    .findOneAndUpdate("", { isActivated: true })
    .then(res => {
      console.log(res);
      res.json({
        confirmation: "Success",
        data: true
      });
    })
    .catch(err => {
      res.json({
        confirmation: "Error",
        error: err.message
      });
    });
});

//Endpoint to enable deactivated mode
router.put("/Deactivate", function(req, res, next) {
  activated
    .findOneAndUpdate("", { isActivated: false })
    .then(
      res.json({
        confirmation: "Success",
        data: false
      })
    )
    .catch(err => {
      res.json({
        confirmation: "Error",
        error: err.message
      });
    });
});

//endpoint to get whether or not the room function is active
router.get("/isActivated", function(req, res, next) {
  activated
    .find()
    .then(result => {
      console.log(result);
      console.log(result[0].isActivated);
      console.log(result.isActivated);
      console.log(result[0]);

      //res.status.json()
      if (result[0].isActivated) {
        res.json({
          confirmation: "Success",
          data: result[0].isActivated
        });
      } else {
        res.status(500).json({
          confirmation: "Success",
          data: result[0].isActivated
        });
      }
    })
    .catch(err =>
      res.json({
        confirmation: "Error",
        error: err.message
      })
    );
});

module.exports = router;
