require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

let { uri } = require('./dbConnect');
let projectRoutes = require('./routes/projectRoutes');
let search = require('./routes/search');
let viewProfile = require('./routes/viewProfile');
let sessions = require('./routes/sessions');
let signup = require('./routes/signup');
let book = require('./routes/book');
let patientUpdate = require('./routes/patientUpdate');
let docUpdate = require('./routes/docUpdate');

app.use(
  session({
    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: new MongoDBSession({
      uri: uri,
      collection: 'sessions',
    }),
  })
);
app.use(express.static(__dirname + '/public'));
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(projectRoutes);
app.use(search);
app.use(viewProfile);
app.use(sessions);
app.use(signup);
app.use(book);
app.use(patientUpdate);
app.use(docUpdate);

//Doctor collection created
const DoctorClassSchema = new mongoose.Schema(
  {
    _email: { type: String },
    _name: { type: String },
    _password: { type: String },
    _spespecialisation: { type: Array },
    _avatar: { type: String },
    _comments: { type: Array },
    _experience: {
      type: Array,
      _HospitalName: { type: String },
      _Duration: { type: String },
    },
    _education: {
      type: Array,
      _UniName: { type: String },
      _Degree: { type: String },
    },
    _AvailableTime: {
      type: Array,
      _date: { type: Date },
      _from: { type: String },
      _to: { type: String },
      _Status: { type: String },
    },
  },
  { collection: 'DoctorClass' }
);

const Doctor = mongoose.model('Doctor', DoctorClassSchema);

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

const PatientClassSchema = new mongoose.Schema(
  {
    _email: { type: String },
    _name: { type: String },
    _password: { type: String },
    _sex: { type: String },
    _dob: { type: String },
    _age: { type: String },
    _phone: { type: String },
    _medicalHistory: {
      type: Array,
      _condition: { type: String },
      _year: { type: String },
    },
    _ratings: {
      type: Array,
      _starCount: { type: String },
      _comment: { type: String },
    },
    _schedule: {
      type: Array,
      _date: { type: Date },
      _from: { type: String },
      _to: { type: String },
      _status: { type: String },
      _doctorName: { type: String },
    },
  },
  { collection: 'Patient' }
);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log('App running at http://localhost:' + port);
});
