function JSONHandler(file){
  var fs = require('fs');
  try {
      var obj = JSON.parse(fs.readFileSync(file, 'utf8'));

      return obj;
  } catch(e) {
      return false;
  }
}

exports.findCourseMap = function(req, res) {
    var targetCourse = req.params.id;
    var targetFile = './app/courses/data/' + targetCourse + ".json"
    var data = JSONHandler(targetFile);
    if(data !== false){
          res.send(data);
    } else {
        res.status(404).send('Invalid Code')
    }
};
