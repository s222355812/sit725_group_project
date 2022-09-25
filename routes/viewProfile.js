const express = require('express');
const router = express.Router();
const path = require('path');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

router.get('/viewProfile', (req, res) => {
  res.sendFile(path.resolve('public/doctor-profile.html'));
});

router.post('/viewProfile', (req, res) => {
  database
    .collection('DoctorClass')
    .find({ _email: req.body.email })
    .toArray((err, result) => {
      let query = { _id: req.session.id };
      let newValue = { $set: { 'session.viewProfileDoctor': [result][0][0] } };
      if (err) throw err;
      else
        database
          .collection('sessions')
          .updateOne(query, newValue, (err, result) => {
            if (err) throw err;
            else console.log('Session viewProfileDoctor updated');
          });
    });
  res.redirect('/viewProfile');
});

router.post('/viewProfile/patient', (req, res) => {
  database
    .collection('Patient')
    .find({ _email: req.body.email })
    .toArray((err, result) => {
      let query = { _id: req.session.id };
      let newValue = { $set: { 'session.viewProfilePatient': [result][0][0] } };
      if (err) throw err;
      else
        database
          .collection('sessions')
          .updateOne(query, newValue, (err, result) => {
            if (err) throw err;
            else console.log('Session viewProfilePatient updated');
          });
    });
  res.redirect('http://localhost:3000/patient-profile.html');
});

module.exports = router;
