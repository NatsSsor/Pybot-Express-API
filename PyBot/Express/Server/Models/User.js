var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var File = require("./File");

var UserSchema = new Schema({
  name: { type: String, required: [true, "Please Enter a Username"] },
  password: { type: String, default: "password" },
  haslock: { type: Boolean, default: false },
  filelocked: { type: String, default: "" }
});

module.exports = mongoose.model("User", UserSchema);
