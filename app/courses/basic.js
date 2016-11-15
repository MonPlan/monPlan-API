function JSONHandler(file){
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync(file, 'utf8'));

  return obj
}

exports.findAll = function(req, res) {
    res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
};

exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};

exports.test = function(req, res) {
    res.send(JSONHandler('./app/courses/db.json'));
};
