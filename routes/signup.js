const express = require('express');
const router = express.Router();
const path = require('path');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

router.post('/signup', (req, res) => {
  let name = req.body.name;
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
    _name: `${name}`,
    _phone: `${phone}`,
    _password: `${password}`,
    _sex: `${sex}`,
    _schedule: [
      {
        _date: '01/01/2001',
        _from: '10 AM',
        _to: '11 AM',
        _status: 'BooKed',
        _doctorName: 'ABC XYZ',
      },
    ],
  });

  database.collection('Patient').insertOne(patientData);
  res.sendFile('public/login.html', {
    root: __dirname,
  });
});

module.exports = router;
