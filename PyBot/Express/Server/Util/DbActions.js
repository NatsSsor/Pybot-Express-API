const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "database";
const client = new MongoClient(url);
const UserTable = "animals";
const FileTable = "File";
const FilesTable = "Files";

class MyDbClient {
  constructor() {}

  Connect() {
    client.connect(function(err) {
      const db = client.db(dbName);
      const collection = db.collection(UserTable);
      collection.find({}).toArray(function(err, data) {
        // console.log("pets");
        //data.forEach(function(pet) {
        //console.log(pet);
        //});
      });
    });
  }

  Add(json, type) {
    if (type === "User") {
      client.connect(function(err) {
        const db = client.db(dbName);
        const collection = db.collection(UserTable);
        collection.insertOne(JSON.parse(json), function(resp) {
          console.log(resp);
          return resp;
        });
      });
    }
  }

  Delete(id) {
    client.connect(function(err) {
      const db = client.db(dbName);
      const collection = db.collection(UserTable);
      collection.deleteOne(id);
    });
  }

  Update(id, json) {
    client.connect(function(err) {
      const db = client.db(dbName);
      const collection = db.collection(UserTable);
      collection.updateOne(id, json);
    });
  }
}

module.exports = MyDbClient;
