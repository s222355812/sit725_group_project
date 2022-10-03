const express = require('express');
const router = express.Router();
const path = require('path');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

router.post('/viewProfile', (req, res) => {
  req.session.searchResults = {};
  req.session.viewProfileDoctor = { _user: 'patient' };
  database
    .collection('DoctorClass')
    .find({ _email: req.body.email })
    .toArray((err, result) => {
      let query = { _id: req.session.id };
      let newValue = { $set: { 'session.viewProfileDoctor': result[0] } };
      if (err) throw err;
      else
        database
          .collection('sessions')
          .updateOne(query, newValue, (err, result) => {
            if (err) throw err;
            else console.log('Session viewProfileDoctor updated');
          });
    });
  res.redirect('/doctor-profile.html');
});

router.post('/viewProfile/patient', (req, res) => {
  database
    .collection('Patient')
    .find(
      { _email: req.body.email },
      {
        projection: {
          _fname: 1,
          _lname: 1,
          _name: 1,
          _age: 1,
          _sex: 1,
          _picture: 1,
        },
      }
    )
    .toArray((err, result) => {
      let query = { _id: req.session.id };
      let newValue = { $set: { 'session.viewProfilePatient': result[0] } };
      if (err) throw err;
      else
        database
          .collection('sessions')
          .updateOne(query, newValue, (err, result) => {
            if (err) throw err;
            else console.log('Session viewProfilePatient updated');
          });
    });
  res.redirect('/patient-profile.html');
});

module.exports = router;
