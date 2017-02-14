function JSONHandler(file){
  var fs = require('fs');
  try {
      var obj = JSON.parse(fs.readFileSync(file, 'utf8'));

      return obj;
  } catch(e) {
      return false;
  }
}

exports.announce = function(req, res) {
    res.status(200).send(announce);
};
