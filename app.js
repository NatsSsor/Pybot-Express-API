var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

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
var app = express();
console.log();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
