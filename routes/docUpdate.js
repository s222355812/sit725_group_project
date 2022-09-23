const express = require('express');
const router = express.Router();
const path = require('path');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

router.post('/docUpdate/pic', (req, res) => {
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
          .collection('DoctorClass')
          .find(query)
          .toArray((err, result) => {
            if (err) throw err;
            else {
              database
                .collection('DoctorClass')
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
