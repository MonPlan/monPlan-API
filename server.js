// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require("express");        // call express
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
var BSON = require("mongodb").BSONPure;

var helmet = require("helmet");
var hidePoweredBy = require("hide-powered-by");
var session = require("express-session");
var nosniff = require("dont-sniff-mimetype");
var ienoopen = require("ienoopen");
var xssFilter = require("x-xss-protection");
var frameguard = require("frameguard");
var hpkp = require("hpkp");
var csp = require("helmet-csp");

// MODULES
var spec        = require("./app/specialisations/specialRoute");
var basic     = require("./app/basic/route");

// VARIABLES
var db;
var app         = express();                 // define our app using express
var cors        = require("cors");
var collectionUnits = "units";
var collectionCourses = "courses";

// HTTP/HTTPS Setup
var fs = require("fs");
var http = require("http");
var https = require("https");
var enableSSL = true;

try {
    var pkey = fs.readFileSync("./ssl/server.key","utf8");
    var cert = fs.readFileSync("./ssl/server.crt","utf8");
    console.log("SSL Directory Detected! Setting up HTTPS configuration");
    var credentials = {key: pkey, cert: cert};
    enableSSL = true;
} catch(err){
    console.log("No SSL Directory Detected");
    console.log("Setting enableSSL VARIABLE to false");
    enableSSL = false;
}


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



console.log("Deploying Security Measures")
app.use(hidePoweredBy({setTo: "Coffee"}));
app.use(nosniff());
app.use(ienoopen());
app.use(xssFilter());
app.use(frameguard({action: "deny"}))
app.use(hpkp({
  maxAge: 1209600,
  sha256s: ["AbCdEf123=", "ZyXwVu456"],

  setIf: function(req,res){
    return req.secure
  }
}));
app.use(csp({
  directives: {
    scriptSrc: ["'self'","'unsafe-inline'"]
  },
  reportOnly: false,
  setAllHeaders: false,
  disabledAndroid: false,
  browserSniff: false
}))

// MUST HAVE MONGODB ON LOCALHOST


console.log("Attempting to connect to mongoDB backend.")
var address = "mongodb://mplanAdmin:Dr6BnHNJydXACJ4@api.monplan.tech:45956/unitsDatabase?authSource=admin"
// Connect to the database before starting the application server.
mongodb.MongoClient.connect(address, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  var httpServer = http.createServer(app);
  httpServer.listen(3000);

  if(enableSSL){
      console.log("Initialising HTTPS Server");
      var httpsServer = https.createServer(credentials, app);
      httpsServer.listen(4000);
  } else {
      console.log("Enabling HTTPS Server is false.");
      console.log("To enable place SSL Cert and Key inside the ssl directory");
  }
  console.log("Ready to Go!")
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var v02 = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function(req, res) {
    res.json({ message: "This is the monPlan API. Please read the API documentation at: https://github.com/monashunitplanner/monplan-api" });
});


app.use(cors());
app.set("etag", false);
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// SPECIALISATION ROUTES
app.get("/spec/", spec.allSpec);
app.get("/spec/:id", spec.findSpec);


app.get("/basic/:id", basic.downloadInfo)

/*  "/unitRatings"
 *    GET: finds all units
 */

app.get("/units/", function(req, res) {
  db.collection(collectionUnits).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get units.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get("/units/:id", function(req, res) {
  db.collection(collectionUnits).findOne({ UnitCode: (req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get unit Data");
    }

    if(doc !== null) {
        res.status(200).json(doc);
    } else {
      res.status(404).json({"msg": "No Unit Data"})
    }
  });
});

/*
app.post("/units/rating/:id", function(req,res) {
  var rating = req.body;

  var newLearnRating = parseInt(rating.learnrating, 10);
  var newEnjoyRating = parseInt(rating.enjoyrating, 10);
  console.log("Updating Unit Rating")
  if(1<newLearnRating<5 && 1<newEnjoyRating<5){
    var unitCode = (req.params.id);
    db.collection(collectionUnits).findOne({ UnitCode: unitCode }, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get unit Data");
      }

      if(doc !== null) {
        var oldEnjoyRating = doc.enjoyRating
        var oldUnitRating = doc.learnRating
        var uploadUnitRating = (newLearnRating + oldUnitRating)/2
        var uploadEnjRating = (newEnjoyRating + oldEnjoyRating)/2

        db.collection(collectionUnits).update({ UnitCode: unitCode }, {"$set": {enjoyRating: uploadEnjRating, learnRating: uploadUnitRating}});
        res.status(200).json({"msg": "Successfully updated"})
      } else {
        res.status(404).json({"msg": "No Unit Data"})
      }
    });
  } else {
    res.status(404).json({"msg": "Invalid Body"})
  }
});
*/

app.get("/courses/:id", function(req, res) {
  db.collection(collectionCourses).findOne({ courseCode: (req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get course map Data");
    }
    if(doc !== null) {
        res.status(200).json(doc);
    } else {
      res.status(404).json({"msg": "No Unit Data"})
    }
  });
});

app.get("/courses/info/:id", function(req, res) {
  db.collection("courseInfo").findOne({ courseCode: (req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get course information Data");
    }
    if(doc !== null) {
        res.status(200).json(doc);
    } else {
      res.status(404).json({"msg": "No Course Information Data"})
    }
  });
});

app.get("/rules/:id", function(req, res) {
  db.collection("rules").find({ unitCode: (req.params.id) }).toArray(function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get unit rules");
    }
    if(doc !== null) {
        res.status(200).json(doc);
    } else {
      res.status(404).json("Missing Rule Data")
    }
  });
});

//User Anonymous Snapshots
app.get("/snaps/:id", function(req, res) {
  //attempt to hash id, if fail return error 418
  try {
    var id = new ObjectId(req.params.id)
  } catch(err) {
    res.status(418).send("I'm a teapot.");
  }
  db.collection("snapshots").findOne({"_id": id}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get snapshot Data");
    }
    if(doc !== null) {
        res.status(200).json(doc);
    } else {
      res.status(404).json({"msg": "No snapshot Data"})
    }
  });
});

app.post("/snaps/", function(req, res) {
  var postBody = req.body;
  var courseDet = postBody.course
  if(postBody.course !== null || postBody.course !== ""){
    db.collection("snapshots").insertOne({"snapshotData": courseDet}, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get snapshot Data");
      }
      if(doc !== null) {
          res.status(200).json(doc.insertedId);
      } else {
        res.status(404).json({"msg": "No snapshot Data"})
      }

    });

  }
});
