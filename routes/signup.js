const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
let {
  getDB
} = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

router.post('/signup', (req, res) => {
  let email = req.body.email;
  let fname = req.body.fname;
  let lname = req.body.fname;
  let password = req.body.password;
  let sex = req.body.sex;
  let dob = req.body.dob;
  let phone = req.body.phoneCode + req.body.phone;
  let schedule = {};
  const birthYear = new Date(dob).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  const Patient = mongoose.model('Patient', PatientClassSchema);
  
  const patientData = new Patient({
    _user: 'patient',
    _email: `${email}`,
    _fname: `${fname}`,
    _lname: `${lname}`,
    _password: `${password}`,
    _picture: 'images/profile.jpg',
    _sex: `${sex}`,
    _dob: `${dob}`,
    _age: `${age}`,
    _phone: `${phone}`,
    _medicalHistory: [{}],
    _schedule: {},
    _patientRatings: {
      'Doctor Name 1': [
        {
          commentDate: 'DD/MM/YYYY',
          docPicture: 'images/sample-picture-doctor.webp',
          docProfileLink: '!#',
          rating: '3.5',
          patientComment:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sagittis scelerisque tincidunt. Praesent blandit tempor vestibulum.',
        },
      ],
    },
  });

  database.collection('Patient').insertOne(patientData);
  res.redirect('/login.html');
});

module.exports = router;
