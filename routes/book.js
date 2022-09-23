const express = require('express');
const router = express.Router();
const path = require('path');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

router.post('/book/appointment', (req, res) => {
  let { myName, myEmail, docEmail, docName, date, from, to } = req.body;
  let query = { _email: docEmail };
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
      else console.log('Doctor appointment updated');
    });

  let query2 = { _id: req.session.id };
  let addAppointment2 = {
    $push: {
      ['session.viewProfile._appointments.' + date]: {
        name: myName,
        email: myEmail,
        from: from,
        to: to,
        status: 'booked',
      },
    },
  };
  database
    .collection('sessions')
    .updateOne(query2, addAppointment2, (err, result) => {
      if (err) throw err;
      else console.log('Session viewProfile appointments updated');
    });

  let query3 = { _email: myEmail };
  let addAppointment3 = {
    $push: {
      ['_schedule.' + date]: {
        name: docName,
        email: docEmail,
        from: from,
        to: to,
        status: 'booked',
      },
    },
  };
  database
    .collection('Patient')
    .updateOne(query3, addAppointment3, (err, result) => {
      if (err) throw err;
      else console.log('Patient schedule updated');
    });

  res.redirect('back');
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
            'session.viewProfile.selectDate': { date: date, day: day },
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
