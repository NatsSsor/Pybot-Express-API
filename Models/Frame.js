var mongoose = require("mongoose");
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
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000  
};
mongoose.connect(connstring, options, (err, database) => {
  if (err) return console.log(err);
});

var FrameSchema = new mongoose.Schema({
  BaseString: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Frame", FrameSchema);
