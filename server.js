// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');
var units    = require('./app/units/unitsRoute');
var app        = express();                 // define our app using express
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'This is the monPlan API. Please read the API documentation' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.get('/units', units.allUnits);
app.get('/units/ext', units.extended);
app.get('/units/ext/:id', units.findByIdExt);
app.get('/units/:id', units.findById);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('monPlan API has loaded');
