const express = require('express');
const router = express.Router();
const path = require('path');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

router.get('/book/appointment', (req, res) => {
  res.sendFile(path.resolve('public/doctor-profile.html'));
});

router.post('/book/appointment', (req, res) => {
  let { myName, myEmail, docEmail, date, from, to } = req.body; // Abc Xyz AbcXyz@gmail.com lei@gmail.com Sep 20, 2022 01:00 PM 01:30 P
  console.log(myName, myEmail, docEmail, date, from, to);

  let query = { _email: docEmail };
  let location = '_appointments[' + date + ']';
  let addAppointment = {
    $push: {
      ['_appointments.' + date]: {
        name: myName,
        email: myEmail,
        from: from,
        to: to,
        status: 'booked',
      },
    },
  };

  database
    .collection('DoctorClass')
    .updateOne(query, addAppointment, (err, result) => {
      if (err) throw err;
      else console.log('Booking Successful');
    });

  database
    .collection('DoctorClass')
    .find({ _email: docEmail })
    .toArray((err, result) => {
      let query = { _id: req.session.id };
      let newValue = { $set: { 'session.viewProfile': [result] } };
      if (err) throw err;
      else
        database
          .collection('sessions')
          .updateOne(query, newValue, (err, result) => {
            if (err) throw err;
            else console.log('Session viewProfile updated');
          });
    });
  res.redirect('/book/appointment');
  // res.send('Booking Successfull');
});

router.post('/book', (req, res) => {
  let { date, day } = req.body;

  database
    .collection('sessions')
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      else {
        let query = { _id: req.session.id };
        let newValue = {
          $set: {
            'session.viewProfile.0.0.selectDate': { date: date, day: day },
          },
        };
        database
          .collection('sessions')
          .updateOne(query, newValue, (err, result) => {
            if (err) throw err;
            else console.log('Session selectDate updated');
          });
      }
    });
  res.send('Date updated');
});

module.exports = router;
