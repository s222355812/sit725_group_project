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
      _Status: {type: Boolean}}

},{collection:'DoctorClass'})

const Doctor = mongoose.model('Doctor', DoctorClassSchema)

const doctor = new Doctor({
  _email: "123@gmail.com",
  _name: "Li Lei",
  _password: "123456",
  _comments: ["Nice doctor", "Pretty nice experience"],
  _experience: [{_HospitalName: "RenMin", _Duration: "5 years"},
               {_HospitalName: "No2", _Duration: "7 years"}],
  _education: [{_UniName: "Deakin", _Degree: "PHD"},
               {_UniName: "Monash", _Degree: "PHD"}],
  _AvailableTime: [{_date: "15/09/2022", _from:"9am", _to:"9.30am", _Status: false}]
})
doctor.save();

// Login
app.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let query = { email: `${email}` };

  database
    .collection('patientClass')
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      if (result[0]) {
        if (result[0].password == password) {
          console.log(result[0]);
          res.sendFile('public/login-welcome.html', { root: __dirname });
        }
      }
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
