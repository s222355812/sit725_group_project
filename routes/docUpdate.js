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

router.post('/docexpadd', (req, res) =>{
  let position = req.body.position;
  let hospital = req.body.hospital;
  let duration = req.body.duration;
  let addexp = {
    $push:{
      ['_experience']:
      {_Position:position, 
       _HospitalName:hospital, 
       _Duration:duration}
      }
  }

  database
   .collection('sessions')
   .find({ _id: req.session.id })
   .toArray((err, result) =>{
    if (err) throw err;
    if(result[0]){
      let email = result[0].session.userData._email;
      let query = {
        _email: `${email}`,
      };

    database
     .collection('DoctorClass')
     .updateOne(query, addexp, (err, result) => {
        if (err) throw err;
        else console.log('Doctor Experience updated');
        res.redirect('doctor-profile.html')
    });

      // database
      //  .collection('DoctorClass')
      //  .updateone(query, {$push:{['_experience']:{_Position:postion, _HospitalName:hospital, _Duration:duration}}}, (err, result) =>{
      //   if (err) throw err;
      //   else{
      //     console.log("Experiences added");
      //     res.redirect('doctor-profile.html');
      //   }
      //  });


    }
   })
})

module.exports = router;
