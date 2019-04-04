const person = require("../Models/Person");
const frame = require("../Models/Frame");
const activated = require("../Models/Activated");
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const shell = require("shelljs");
var jwt = require('jsonwebtoken');
var config = require('../config/enviromentVariables');

var verifyLoggedIn = require("./VerifyToken");

const name = "Ross";

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

function sendEmail() {
  /* const Email = require("email-templates");

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "programmingthingsbot@gmail.com",
      pass: "shanesnose"
    }
  });

  const email = new Email({
    message: {
      from: "programmingthingsbot@gmail.com"
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter
  });

  email
    .send({
      template: "intruder",
      message: {
        to: "rossstangmod@gmail.com"
      },
      locals: {
        name: name
      }
    })
    .then(console.log)
    .catch(console.error); */

  shell.exec("./emails/email.sh");
}

async function getactivated() {
  return await activated.find().exec();
}

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
router.post("/Init", verifyLoggedIn, function(req, res, next) {
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
router.post("/Create", verifyLoggedIn, function(req, res, next) {
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
router.get("/View", verifyLoggedIn, function(req, res, next) {
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
router.put("/Update", verifyLoggedIn, function(req, res, next) {
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
router.delete("/Delete", verifyLoggedIn, function(req, res, next) {
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
router.get("/Present", verifyLoggedIn, function(req, res, next) {
  getactivated().then(result => {
    console.log(result);
    console.log(result[0].isActivated);
    console.log(result.isActivated);
    console.log(result[0]);

    //res.status.json()
    if (!result[0].isActivated) {
      res.status(204).json({
        confirmation: "Error",
        reason:
          "API is currently deactivated, please re-enable if you wish to see who is in the room"
      });
      return;
    } else {
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
    }
    console.log(isactivated);
  });
});

//register someone as present
router.put("/IsPresent", verifyLoggedIn, function(req, res, next) {
  const query = req.query;
  console.log(query);

  if (query.Name == "Unknown") {
    console.log(
      "Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. Hey, you're [some professional insult]. "
    );
    sendEmail();
  }
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
router.put("/HasLeft", verifyLoggedIn, function(req, res, next) {
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
router.put("/Activate", verifyLoggedIn, function(req, res, next) {
  activated
    .findOneAndUpdate("", { isActivated: true })
    .then(resp => {
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
router.put("/Deactivate", verifyLoggedIn, function(req, res, next) {
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
router.get("/isActivated", verifyLoggedIn, function(req, res, next) {
  getactivated()
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

//endpoint to show current video frame
router.put("/setFrame", verifyLoggedIn, function(req, res, next) {
  let base64string = req.body.baseString;

  var options = { upsert: true, new: true, setDefaultsOnInsert: true };

  frame
    .findOneAndUpdate({}, { BaseString: base64string }, options)
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

router.get("/getFrame", verifyLoggedIn, function(req, res, next) {
  frame.findOne({}, (err, result) => {
    getactivated()
      .then(activate => {
        if (activate[0].isActivated) {
          res.json({
            confirmation: "Success",
            data: result.BaseString
          });
        } else {
          res.status(204).send("success");
        }
      })
      .catch(err => {
        res.json({
          confirmation: "Error",
          error: err.message
        });
      });
  });
});


router.post("/login", function(req,res,next) {
  let username = req.body.username;
  let password = req.body.password;

  if (username === "admin" && password === "admin")
  {
      // create a token
      var token = jwt.sign({
        name: username,
        pass: password 
      }, config.secret, {
        expiresIn: 1000000000000000086400 // expires in a very long time (Need so tests still work)
      });
      res.send(token);
  }
  else {
    res.status(500).send("FAILED");
  }

})

module.exports = router;
