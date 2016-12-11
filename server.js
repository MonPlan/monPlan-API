// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');

//our modules
var units    = require('./app/units/unitsRoute');
var spec    = require('./app/specialisations/specialRoute');

var app        = express();                 // define our app using express
var cors = require('cors')


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set port to 3000 to help better distinguish our API from port 8080
var port = process.env.PORT || 3000;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'This is the monPlan API v0.2.10. Please read the API documentation at: https://github.com/monashunitplanner/monplan-api' });
});
app.use(cors());
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// UNITS ROUTES
app.get('/units/', units.allUnits);
app.get('/units/:id', units.findUnit);

// SPECIALISATION ROUTES
app.get('/spec/', spec.allSpec);
app.get('/spec/:id', spec.findSpec);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('monPlan API has loaded'); //log onto console that server is successfully running
