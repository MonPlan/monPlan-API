function JSONHandler(file){
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync(file, 'utf8'));

  return obj
}

// Find target Course using Binary Search
function findExtended(target, array) {
  var lowerBound = 0;
  var upperBound = (array.length - 1);
  var currentbound;

  while (lowerBound <= upperBound){
    var middle = Math.floor((lowerBound + upperBound)/2) //integer dicision to find middle
    console.log(array[middle])
    if(target === array[middle].code){
      var specialCode = array[middle].code;
      var specialName = array[middle].title;
      var specialCategory = array[middle].category;

      var returnObject = {"specTitle": specialName,"specCode": specialCode, "specCat": specialCategory}
      return returnObject
    } else {
      if(target < array[middle].code) {
        upperBound = middle - 1
      } else {
        lowerBound = middle + 1
      }
    }
  }
  return false
}


exports.allSpec = function(req, res) {
    res.send(JSONHandler('./app/specialisations/specialisation.json'));
};

exports.findSpec = function(req, res) {
    var targetCourse = req.params.id;
    var result = findExtended(targetCourse, JSONHandler('./app/specialisations/specialisation.json'))

    if(result !== false){
        res.status(200).send(result);
    } else {
        res.status(404).send('Not found');
    }
};
