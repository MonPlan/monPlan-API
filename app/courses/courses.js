function JSONHandler(file){
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync(file, 'utf8'));

  return obj
}

exports.findCourseMap = function(req, res) {
    var targetCourse = req.params.id;
    var targetFile = './app/courses/' + targetCourse + ".json"
    var result = JSONHandler(targetFile)

    if(result !== false){
      res.send(result);
    } else {
        res.status(404).send('Not found');
    }
};
