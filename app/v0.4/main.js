var mongoose   = require('mongoose');
mongoose.connect('mongodb://api.monplan.tech:27017/unitRating'); // connect to our database

var Schema       = mongoose.Schema;

var Unit   = new Schema({
    unitCode: String,
    Rating: Number
});

exports.getUnitRating = function(req, res) {
    Unit.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
      });
};
