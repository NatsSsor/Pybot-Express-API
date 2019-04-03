var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
const mongoose = require("mongoose");
var Strategy = require("passport-facebook").Strategy;
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

passport.use(
  new Strategy(
    {
      clientID: process.env["1956842057777167"],
      clientSecret: process.env["65a671b731fd29e8bf8378ddb4172e7e"],
      callbackURL: "/return"
    },
    function(accessToken, refreshToken, profile, cb) {
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      console.log(accessToken);
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
// Connect to the db
/* MongoClient.connect(connstring2, function(err, db) {
  if (err) throw err;

  //Write databse Insert/Update/Query code here..
}); */

mongoose.connect(connstring, options, (err, database) => {
  if (err) return console.log(err);
});

const connectionstring =
  "mongodb://pibotdb:password1!@den1.mongo1.gear.host:27001/pibotdb";

/* mongoose.connect(connectionstring);
var connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function() {
  //require("./app/routes")(app);
}); */

//const url = "mongodb://localhost:27017";
//const dbName = "database";
//const client = new MongoClient(url);

/* var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var addRouter = require("./routes/add");
var viewRouter = require("./routes/view");
var updateRouter = require("./routes/update");
var deleteRouter = require("./routes/delete"); */
var peopleRouter = require("./routes/PersonRoutes");
var activatedRouter = require("./routes/ActivatedRoutes");
var fbRouter = require("./routes/MessengerRoutes");
var app = express();
app.use(passport.initialize());
app.use(passport.session());
console.log();
// app.options("/*", (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With"
//   );
//   res.sendStatus(200);
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/fb", fbRouter);
/* app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/add", addRouter);
app.use("/view", viewRouter);
app.use("/update", updateRouter);
app.use("/delete", deleteRouter); */

app.use("/intheroom", peopleRouter);
app.use("/activated", activatedRouter);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

module.exports = app;
