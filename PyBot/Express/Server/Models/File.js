var mongoose = require("mongoose");

var FileSchema = new mongoose.Schema({
  Filename: {
    type: String,
    required: [true, "File name is a required field, please enter a file name"]
  },
  Filesize: {
    type: Number,
    required: [true, "File size is a required field, please enter a file size"]
  },
  FileExt: {
    type: String,
    required: [
      true,
      "File Extension is a required field, please enter a file extension"
    ]
  },
  Author: { type: String, default: "None Supplied" },
  Date: { type: Date, default: Date.now() },
  Keywords: [],
  Tags: []
});

module.exports = mongoose.model("File", FileSchema);
