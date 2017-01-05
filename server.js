// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');

//our modules
var units       = require('./app/units/unitsRoute');
var spec        = require('./app/specialisations/specialRoute');
var courses     = require('./app/courses/courses');
var basic     = require('./app/basic/route');

var app         = express();                 // define our app using express
var cors        = require('cors');

var unitRating = require('./app/v0.4/main');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set port to 3000 to help better distinguish our API from port 8080
var port = process.env.PORT || 3000;

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

// UNITS ROUTES
app.get('/units/', units.allUnits);
app.get('/units/:id', units.findUnit);

// SPECIALISATION ROUTES
app.get('/spec/', spec.allSpec);
app.get('/spec/:id', spec.findSpec);

app.get('/courses/:id', courses.findCourseMap)

app.get('/basic/:id', basic.downloadInfo)

app.get('/rating/:id', unitRating.getUnitRating)
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('monPlan API has loaded'); //log onto console that server is successfully running
