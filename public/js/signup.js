const express = require('express');
const router = express.Router();
const path = require('path');
var mongoose = require('mongoose');
let {
  getDB
} = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

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

router.post('/signup', (req, res) => {
  let fname = req.body.fname;
  let lname = req.body.lname;
  let email = req.body.email;
  let sex = req.body.sex;
  let dob = req.body.dob;
  let password = req.body.password;
  let phone = req.body.phoneCode + req.body.phone;
  const birthYear = new Date(dob).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  const Patient = mongoose.model('Patient', PatientClassSchema);

  const patientData = new Patient({
    _age: `${age}`,
    _dob: `${dob}`,
    _email: `${email}`,
    _name: `${fname}` + " " + `${lname}`,
    _phone: `${phone}`,
    _password: `${password}`,
    _sex: `${sex}`,
    _schedule: [{
      _date: '01/01/2001',
      _from: '10 AM',
      _to: '11 AM',
      _status: 'BooKed',
      _doctorName: 'ABC XYZ',
    }]
  });

  database.collection('Patient').insertOne(patientData);
  res.sendFile(path.resolve('public/login.html'));
});

module.exports = router;