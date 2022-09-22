const express = require('express');
const router = express.Router();
const path = require('path');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
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
