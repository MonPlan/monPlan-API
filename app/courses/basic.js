function JSONHandler(file){
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync(file, 'utf8'));

  return obj
}

//asume list is already sorted, use binary search
function findUnitCode(target, array) {
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

exports.allUnits = function(req, res) {
    res.send(JSONHandler('./app/courses/db.json'));
};

exports.findById = function(req, res) {
    var targetCourse = req.params.id;
    var result = findUnitCode(targetCourse, JSONHandler('./app/courses/db.json'))

    if(result !== false){
      res.send({id:req.params.id, name: result.UnitName, faculty: result.Faculty});
    } else {
      res.send('Missing')
    }
};
