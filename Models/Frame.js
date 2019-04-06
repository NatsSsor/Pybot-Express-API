var mongoose = require("mongoose");
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
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000  
};//MongoDB connection options, since it wouldnt work with normal username / password connection

mongoose.connect(connstring, options, (err, database) => {
  if (err) return console.log(err);
});

var FrameSchema = new mongoose.Schema({
  BaseString: {
    type: String,
    required: false
  }
});//Schema for the Frames mongo db collection

module.exports = mongoose.model("Frame", FrameSchema);//Mongoose model export
