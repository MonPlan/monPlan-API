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
      var descrip = result.Sypnosis;
      var unitPreqs = result.Preqs;
      var unitProhib = result.Proh;
      var unitLocation = result.LocationAndTime;
      var CreditPoints = result.CreditPoints;
      var eftsl = result.EFTSL;
      var sca = result.SCABand;

      var returnObject = {"UnitCode": target, "UnitName": unitName,"Description": descrip, "UnitLocationTP": unitLocation, "CreditPoints": CreditPoints, "Faculty": unitFac, "EFTSL":eftsl, "SCABand": sca, "Prerequisites": unitPreqs, "Prohibitions":unitProhib}
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

/*
UnitCode": "AMG5018",
"UnitName": "Celebrity, fashion, publicity",
"Faculty": "Faculty of Arts",
"LocationAndTime": "[[['Malaysia'], ['First semester 2017 (Day)']]]",
"CreditPoints": 12,
"EFTSL": 0.25,
"Preqs": "",
"Proh": "APG5018, AMG4018",
"SCABand": 1,
"Sypnosis": "The unit looks at the \"attention economy\" as found in the media industry, paying particular attention to celebrity and fashion. Students are provided with a theoretical and historical understanding of publicity as a general field, from the emergence of the movie star and the development of magazine journalism to celebrity Twitter feeds and contemporary public relations.",
*/

exports.allUnits = function(req, res) {
    res.send(JSONHandler('./app/v0.3/units.json'));
};

exports.findUnit = function(req, res) {
    var targetCourse = req.params.id;
    var result = findExtended(targetCourse, JSONHandler('./app/v0.3/units.json'))

    if(result !== false){
      res.send(result);
    } else {
        res.status(404).send('Not found');
    }
};
