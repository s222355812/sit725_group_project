const express = require('express');
const router = express.Router();
const path = require('path');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

router.post('/patientupdate', (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let age = req.body.age;
  let sex = req.body.sex;
  let newValue = {
    $set: { _fname: firstName, _lname: lastName, _age: age, _sex: sex },
  };
  database
    .collection('sessions')
    .find({ _id: req.session.id })
    .toArray((err, result) => {
      if (err) throw err;
      if (result[0]) {
        console.log('result[0] works');
        let email = result[0].session.userData._email;
        let query = {
          _email: `${email}`,
        };
        database
          .collection('Patient')
          .find(query)
          .toArray((err, patient) => {
            console.log('enter patient collection');
            if (err) throw err;
            else {
              database
                .collection('Patient')
                .updateMany(query, newValue, (err, result) => {
                  if (err) throw err;
                  else {
                    console.log('all updated');
                  }

                  res.redirect('/patient-profile.html');
                });
            }
          });
      }
    });
});

router.post('/patientupdate/pic', (req, res) => {
  let picture = req.body.picture;
  database
    .collection('sessions')
    .find({ _id: req.session.id })
    .toArray((err, result) => {
      if (err) throw err;
      if (result[0]) {
        let email = result[0].session.userData._email;
        let query = {
          _email: `${email}`,
        };
        let newPic = { $set: { _picture: picture } };
        database
          .collection('Patient')
          .find(query)
          .toArray((err, patient) => {
            if (err) throw err;
            else {
              database
                .collection('Patient')
                .updateOne(query, newPic, (err, result) => {
                  if (err) throw err;
                  else {
                    console.log('Picture updated');
                  }
                });
            }
          });
      }
    });
  res.redirect('back');
});

module.exports = router;
