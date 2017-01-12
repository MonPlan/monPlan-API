// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

// MODULES
var spec        = require('./app/specialisations/specialRoute');
var basic     = require('./app/basic/route');

// VARIABLES
var db;
var app         = express();                 // define our app using express
var cors        = require('cors');
var collectionUnits = "units";
var collectionCourses = "courses";
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MUST HAVE MONGODB ON LOCALHOST
//var address = "mongodb://localhost:27017/unitsDatabase"
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

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
var v02 = express.Router();
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'This is the monPlan API. Please read the API documentation at: https://github.com/monashunitplanner/monplan-api' });
});


app.use(cors());
app.set('etag', false);
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// SPECIALISATION ROUTES
app.get('/spec/', spec.allSpec);
app.get('/spec/:id', spec.findSpec);


app.get('/basic/:id', basic.downloadInfo)

/*  "/unitRatings"
 *    GET: finds all units
 */

app.get("/units/", function(req, res) {
  db.collection(collection).find({}).toArray(function(err, docs) {
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
      res.status(404).json({'msg': 'No Unit Data'})
    }
  });
});

app.get("/courses/:id", function(req, res) {
  db.collection(collectionCourses).findOne({ courseCode: (req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get unit Data");
    }
    if(doc !== null) {
        res.status(200).json(doc);
    } else {
      res.status(404).json({'msg': 'No Unit Data'})
    }
  });
});
