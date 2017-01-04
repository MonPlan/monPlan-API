// Units
var mongoose = require('mongoose')

mongoose.connect("mongodb://monplan:monplan123@api.monplan.tech:27017/monplan", {auth: {authdb: 'local'}})

var defaultSchema = new mongoose.Schema({
  UnitCode: String,
  UnitName: String,
  Faculty: String,
  Descrip: String,
  TeachingPeriods: String,
  Prerequisites: String,
  Corequisites: String,
  CreditPoints: Number,
  EFTSL: Number,
  SCABand: Number,
});

var Units = mongoose.model('units', defaultSchema);

var newUnit = new Units({
  UnitCode: "FIT1040",
  UnitName: "Digital futures: adventures in programming",
  Faculty: "Faculty of Information Technology",
  TeachingPeriods: [[["Clayton"], ["First semester 2017 (Day)"]]],
  CreditPoints: 6,
  EFTSL: 0.125,
  Prerequisites: "",
  Corequisites: "FIT1045, FIT1048, FIT1051, FIT1002. Note that FIT1040 can only be completed prior to FIT1045, FIT1048 and FIT1051 or equivalent.",
  SCABand: 2,
  Descrip: "This unit will provide students with an overview of the fundamentals required to create programs. Students will learn to develop descriptions of algorithms and program logic using pseudocode which will be implemented as working software programs using a visual procedural programming language. The unit will explore a variety of application domains including: computer games, business and science applications, computer generated arts, computer-based simulations and the control of simple robots. The topics covered will include the fundamental concepts: data types and structures, basic types of input and output, program control structures, and modular design along with the basics of event-driven programming and objects. These topics will be covered while placing an emphasis on the need to design program code that is easy to maintain, read, test, and is well documented."
});
