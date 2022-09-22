const express = require('express');
const router = express.Router();
const path = require('path');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

router.get('/search', (req, res) => {
  res.sendFile(path.resolve('public/doctor-list.html'));
});

router.post('/search', (req, res) => {
  database
    .collection('DoctorClass')
    .find({ _specialisation: { $all: [req.body.search] } })
    .toArray((err, result) => {
      let query = { _id: req.session.id };
      let newValue = { $set: { 'session.searchResults': [result] } };
      if (err) throw err;
      else
        database
          .collection('sessions')
          .updateOne(query, newValue, (err, result) => {
            if (err) throw err;
            else console.log('Session searchResults updated');
          });
    });
  res.redirect('/search');
});
module.exports = router;
