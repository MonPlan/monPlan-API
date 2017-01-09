var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var collection = "ratings"

var app = express();

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

var address = "mongodb://api.monplan.tech:27017/unitRating"
// Connect to the database before starting the application server.
mongodb.MongoClient.connect(address, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// units API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/units"
 *    GET: finds all units
 *    POST: creates a new contact
 */

app.get("/units", function(req, res) {
  db.collection(collection).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get units.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/units", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!(req.body.firstName || req.body.lastName)) {
    handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
  }

  db.collection(collection).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/units/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/units/:id", function(req, res) {
  db.collection(collection).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/units/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(collection).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      res.status(204).end();
    }
  });
});

app.delete("/units/:id", function(req, res) {
  db.collection(collection).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(204).end();
    }
  });
});
