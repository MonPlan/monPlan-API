function JSONHandler(file){
  var fs = require('fs');
  try {
      var obj = JSON.parse(fs.readFileSync(file, 'utf8'));

      return obj;
  } catch(e) {
      return false;
  }
}

exports.downloadInfo = function(req, res) {
    var target = req.params.id;
    target = target + ".json"
    var targetFile = './app/basic/' + target
    if(target === "teachingperiods.json"){
        var result = JSONHandler(targetFile)
        res.status(200).send(result);
    } else if(target === "units.json"){
        var result = JSONHandler(targetFile)
        res.status(200).send(result);
    } else if(target === "courses.json"){
        var result = JSONHandler(targetFile)
        res.status(200).send(result);
    } else {
    res.status(404).send('Invalid or Missing File')
    }
};
