const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const app = express();
let database;
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Add database connection
const uri =
  'mongodb+srv://getdocteam:sit725@mycluster.uawhx6v.mongodb.net/getdoc?retryWrites=true&w=majority';
// connect mongoose to call the schema function
mongoose.connect(uri, {useNewUrlParser:true}, (err) =>{
  if (err){
    throw err;
  }
  else{
    console.log("Mongoose Connect successfully");
  }
})
  // Connect to MongoDB
  MongoClient.connect(uri, { useNewURLParser: true }, (err, result) => {
    if (err) throw err;
    database = result.db('getdoc');
    console.log('MongoDB connection successful');
  });

const getCollection = (collection, res) => {
  database
    .collection(collection)
    .find({})
    .toArray((err, result) => {
      if (err) res.json({ statusCode: 400, message: err });
      else res.json({ statusCode: 200, data: result, message: 'Success' });
    });
};

// homepage collection
app.get('/api/homepage', (req, res) => {
  getCollection('homepage', res);
});

// docAppointment collection
app.get('/api/docAppointment', (req, res) => {
  getCollection('docAppointment', res);
});

// patientRatings collection
app.get('/api/patientRatings', (req, res) => {
  getCollection('patientRatings', res);
});

// docSched collection
app.get('/api/docSched', (req, res) => {
  getCollection('docSched', res);
});

// patientSched collection
app.get('/api/patientSched', (req, res) => {
  getCollection('patientSched', res);
});

//Doctor collection created
const DoctorClassSchema = new mongoose.Schema({
  _email: {type: String},
  _name: {type: String},
  _password: {type: String},
  _spespecialisation: {type: Array},
  _avatar: {type: String},
  _comments: {type: Array},
  _experience: {type: Array, 
      _HospitalName: {type: String},
      _Duration: {type: String}
  },
  _education: {type: Array,
      _UniName: {type: String},
      _Degree: {type: String}
    },
  _AvailableTime: {type: Array,
      _date: {type: Date},
      _from: {type: String},
      _to: {type: String},
      _Status: {type: String}}

},{collection:'DoctorClass'})

const Doctor = mongoose.model('Doctor', DoctorClassSchema)

// Here you can add doctors by typing below
// const doctor = new Doctor({
  // _email: "David@gmail.com",
  // _name: "David",
  // _password: "david123",
  // _spespecialisation:["Gereral Medicine"],
  // _avatar: "public/images/sample-picture-doctor.webp",
  // _comments: ["David is so nice", "he is so patient"],
  // _experience: [{"_HospitalName": "Melbourne University Hosptial", "_Duration": "2 years"}],
  // _education: [{_UniName: "Monash", _Degree: "Master"},
  //              {_UniName: "Melbourne University", _Degree: "PHD"}],
  // _AvailableTime: [{_date: "26/09/2022", _from:"10am", _to:"10.30am", _Status: "free"}]
// })
// doctor.save();


const PatientClassSchema = new mongoose.Schema({
  _email: {type: String},
  _name: {type: String},
  _password: {type: String},
  _sex: {type: String},
  _dob: {type: String},
  _age: {type: String},
  _phone: {type: String},
  _medicalHistory: {type: Array, 
      _condition: {type: String},
      _year: {type: String}
  },
  _ratings: {type: Array,
      _starCount: {type: String},
      _comment: {type: String}
    },
  _schedule: {type: Array,
      _date: {type: Date},
      _from: {type: String},
      _to: {type: String},
      _status: {type: String},
      _doctorName: {type: String}}
},{collection:'Patient'})

// Login
app.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let query = {
    _email: `${email}`
  };
  database
    .collection('Patient')
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      if (result[0]) {
        if (result[0]._password == password) {
          res.sendFile('public/login-welcome.html', {
            root: __dirname
          });
        }
      }
    });
});

//Sign-Up
app.post('/signup', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let sex = req.body.sex;
  let dob = req.body.dob;
  let password = req.body.password;
  let phone = req.body.phoneCode + req.body.phone;
  const birthYear = new Date(dob).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  const Patient = mongoose.model('Patient', PatientClassSchema)

  const patientData = new Patient({
    _age: `${age}`,
    _dob: `${dob}`,
    _email: `${email}`,
    _name: `${name}`,
    _phone: `${phone}`,
    _password: `${password}`,
    _sex: `${sex}`,
    _schedule:[{
      _date: "01/01/2001",
        _from: "10 AM",
        _to: "11 AM",
        _status: "BooKed",
        _doctorName: "ABC XYZ"
    }]
  })

  database.collection('Patient').insertOne(patientData);
  res.sendFile('public/login.html', {
    root: __dirname
  });


    Doctor.findOne({_email: email}, function(error, foundUser){
      if(!error){
          if(foundUser){
              if(foundUser._password == password){
                res.sendFile('public/login-welcome.html', { root: __dirname });
              }
          }
          else{
              console.log("please sign up first")
          }
      }
  })
});


const port = process.env.port || 3000;

app.listen(port, () => {
  console.log('App running at http://localhost:' + port);
});
