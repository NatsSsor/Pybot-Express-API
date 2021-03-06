/** Express router providing people related routes
 * @module routers/PersonRoutes
 * @requires express
 */






const person = require("../Models/Person");
const frame = require("../Models/Frame");
const activated = require("../Models/Activated");
const express = require("express");
/**
 * Express router to mount people related functions on.
 * @type {object}
 * @const
 * @namespace peopleRouter
 */
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

/**
 * Sends user an email with shell when an unknown user is detected.
 * @name sendEmail
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 */

function sendEmail() {
  //commented code below worked on openshift but not dans server

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

  shell.exec("./emails/email.sh");// uses shelljs to execute the email.sh file that 
}



/**
 * returns the first retrieved activated document inside a promise from mongoDB.
 * @name getactivated
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 * @returns {Promise}
 */
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
/**
 * Initialises the People collection with the default 5 users above
 * @name post/Init
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 * 
 */
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

/**
 * Creates a new user based on the data inputted into the body if the user is logged in
 * @name post/Create
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 * 
 */
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

/**
 * Returns a JSON response of the People collection for viewing if the user is logged in
 * @name get/View
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 * 
 */
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

/**
 * Updates a user indicated by the query string with the information in the body tag, if the user is logged in and has admin priviledges
 * @name put/Update
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 * @param {string} Name - Query: The user to alter. Body: The new name of the user present in the room
 * @param {bool} isPresent - Query: Find users with this Status. Body: Whether or not that user is present in the room or not
 * 
 */
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

/**
 * Deletes the person from the People collection depending on the query string supplied.
 * @name delete/Delete
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @param Name - Name of the person you wish to delete (Optional)
 * @param isPresent - Whether or not the person you wish to delete is in the room
 * @inner
 * 
 */
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

/**
 * Checks and responds with whether or not any users are currently in the room
 * @name get/Present
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 * 
 */
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


/**
 * Registers a specific person as present using the user passed in the query parameters
 * @name put/IsPresent
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 * @param {string} Name - Name of the person you would like to mark as present (Optional)
 * @param {bool} isPresent - Status of the person who you would like to mark as present (Optional) (n.b. you really shouldnt use this as the defining variable, its here because you technically can)
 */

router.put("/IsPresent", verifyLoggedIn, function(req, res, next) {
  const query = req.query;
  console.log(query);

  if (query.Name == "Unknown") {
    
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

/**
 * Registers that someone has left using the parameters in the query string
 * @name put/HasLeft
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 * 
 * @param {string} Name - Name of the person you would like to mark as having left the room (Optional)
 * @param {bool} isPresent - Status of the person who you would like to mark as having left the room (Optional) (n.b. you really shouldnt use this as the defining variable, its here because you technically can)
 
 */
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

/**
 * Activates the PyBot system to scan faces
 * @name put/Activate
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 * 
 */

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

/**
 * De-activates the Pybot system so it wont scan for faces anymore
 * @name put/Deactivate
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 * 
 */
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

/**
 * endpoint to get whether or not the room function is active
 * @name put/isActivated
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 * 
 */


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


/**
 * endpoint to show current video frame
 * @name put/setFrame
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 * @param {string} baseString - base64encoded image string for the live view on the website
 * 
 */

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



/**
 * endpoint to show current video frame
 * @name get/getFrame
 * @function 
 * @memberof module:routers/PersonRoutes~peopleRouter
 * @inner
 * 
 */
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

/**
 * open route for login, responds with a JWT token to the client
 * @name post/login
 * @function 
 * @memberof module:routes/PersonRoutes
 * @inner
 * @param {string} username - username of the person to be logged in
 * @param {string} password - password for the matching username
 * 
 */
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
