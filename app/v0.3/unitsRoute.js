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
      result = array[middle]
      var unitName = result.UnitName;
      var unitFac = result.Faculty;
      var descrip = result.Synopsis;
      var unitPreqs = result.Preqs;
      var unitProhib = result.Proh;
      var unitLocation = result.LocationAndTime;
      var CreditPoints = result.CreditPoints;
      var eftsl = result.EFTSL;
      var sca = result.SCABand;

      var returnObject = {"UnitName": unitName,"Description": descrip, "Location": LocationAndTime, "CreditPoints": CreditPoints, "Faculty": unitFac, "EFTSL":eftsl, "SCABand": sca, "Prerequisites": unitPreqs, "Prohibitions":unitProhib}
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
    res.send(JSONHandler('./app/v0.3/pha.json'));
};

exports.findUnit = function(req, res) {
    var targetCourse = req.params.id;
    var result = findExtended(targetCourse, JSONHandler('./app/v0.3/pha.json'))

    if(result !== false){
      res.send(result);
    } else {
        res.status(404).send('Not found');
    }
};
