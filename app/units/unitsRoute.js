function JSONHandler(file){
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync(file, 'utf8'));

  return obj
}

// Find target Course using Binary Search
function findBasic(target, array) {
  var lowerBound = 0;
  var upperBound = (array.length - 1);
  var currentbound;

  while (lowerBound <= upperBound){
    var middle = Math.floor((lowerBound + upperBound)/2) //integer dicision to find middle
    if(target === array[middle].UnitCode){
      var unitName = array[middle].UnitName
      var unitFac = array[middle].Faculty

      var returnObject = {"UnitName": unitName,"Faculty": unitFac}
      return returnObject
    } else {
      if(target < array[middle].UnitCode) {
        upperBound = middle - 1
      } else {
        lowerBound = middle + 1
      }
    }
  }
  return false
}

// Find target Course using Binary Search
function findExtended(target, array) {
  var lowerBound = 0;
  var upperBound = (array.length - 1);
  var currentbound;

  while (lowerBound <= upperBound){
    var middle = Math.floor((lowerBound + upperBound)/2) //integer dicision to find middle
    if(target === array[middle].UnitCode){
      var unitName = array[middle].UnitName;
      var unitFac = array[middle].Faculty;
      var descrip = array[middle].Synopsis;
      var unitPreqs = array[middle].Preqs;
      var unitProhib = array[middle].Proh;

      var returnObject = {"UnitName": unitName,"Description": descrip, "Faculty": unitFac, "Prerequisites": unitPreqs, "Prohibitions":unitProhib}
      return returnObject
    } else {
      if(target < array[middle].UnitCode) {
        upperBound = middle - 1
      } else {
        lowerBound = middle + 1
      }
    }
  }
  return false
}


exports.allUnits = function(req, res) {
    res.send(JSONHandler('./app/units/extended.json'));
};

exports.findUnit = function(req, res) {
    var targetCourse = req.params.id;
    var result = findExtended(targetCourse, JSONHandler('./app/units/extended.json'))

    if(result !== false){
      res.send(result);
    } else {
        res.status(404).send('Not found');
    }
};
