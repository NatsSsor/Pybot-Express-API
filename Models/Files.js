var mongoose = require("mongoose");
var file = require("./File");
var FilesSchema = mongoose.Schema({
    Id = number,
    Filename = String,
    FileHistory = [file.file],
    LastUpdated = Date,
})

module.exports = mongoose.model("Files",FilesSchema);