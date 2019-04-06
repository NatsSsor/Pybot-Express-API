var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");//DEPRECATED
const mongoose = require("mongoose");
var Strategy = require("passport-facebook").Strategy;//DEPRECATED

const connstring = "mongodb://den1.mongo1.gear.host:27001/pibotdb";//Gearhost mongo instance connection string

const options = {
  auth: {
    authSource: "pibotdb"
  },
  user: "pibotdb",
  pass: "password1!",
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000  
};//MongoDB connection options, since it wouldnt work with normal username / password connection



mongoose.connect(connstring, options, (err, database) => {
  if (err) return console.log(err);
});

const connectionstring =
  "mongodb://pibotdb:password1!@den1.mongo1.gear.host:27001/pibotdb";

var peopleRouter = require("./routes/PersonRoutes");//handles people entering and exiting the room, as well as email notifications
var activatedRouter = require("./routes/ActivatedRoutes");//handles the initialisation of the activated collections
var fbRouter = require("./routes/MessengerRoutes");//DEPRECATED
var app = express();

console.log();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-access-token, Content-Type, Accept");
  next();
});//Handles CORS exceptions as we are talking on multiple servers, as well as x-access-token for JWT Tokens

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/fb", fbRouter);

app.use("/intheroom", peopleRouter);//accessible route for the peopleRouter
app.use("/activated", activatedRouter);// accessible route for the activatedRouter

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});//More CORS allowances

app.get("/", function(req, res) {
  res.status("200").send("Service is up");
});//Express can randomly die if this isnt setup when a check is done to /

module.exports = app;
