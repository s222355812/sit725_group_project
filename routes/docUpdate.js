const express = require('express');
const router = express.Router();
const path = require('path');

let { getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

//doc change pic
router.post('/docUpdate/pic', (req, res) => {
  let picture = req.body.picture;
  let email = req.session.userData._email;
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
  // res.redirect('back');
  // res.redirect('/doctor-profile.html');

  // res.redirect('http://localhost:3000/doctor-profile.html');
});

//doc add exp
router.post('/docexpadd', (req, res) => {
  let position = req.body.position;
  let hospital = req.body.hospital;
  let duration = req.body.duration;
  let addexp = {
    $push: {
      ['_experience']: {
        _Position: position,
        _HospitalName: hospital,
        _Duration: duration,
      },
    },
  };
  // let addexp1 = {
  //   $push:{
  //     ['session.userData._experience']:
  //     {_Position:position,
  //      _HospitalName:hospital,
  //      _Duration:duration}
  //     }
  // }

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

        database
          .collection('DoctorClass')
          .updateOne(query, addexp, (err, result) => {
            if (err) throw err;
            else console.log('Doctor Experience updated');
            res.redirect('doctor-profile.html');
          });

        // let query2 = { _id: req.session.id };

        // database
        // .collection('sessions')
        // .updateOne(query2, addexp1, (err, result) => {
        //   if (err) throw err;
        //   else console.log('Session Exp updated');
        // });
      }
    });
});

//doc add edu
router.post('/doceduadd', (req, res) => {
  let degree = req.body.degree;
  let school = req.body.school;
  let addedu = {
    $push: {
      ['_education']: { _UniName: school, _Degree: degree },
    },
  };
  // let addedu1 = {
  //   $push:{
  //     ['session.userData._education']:
  //     {_UniName:school,
  //       _Degree:degree
  //     }
  //   }
  // }
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

        database
          .collection('DoctorClass')
          .updateOne(query, addedu, (err, result) => {
            if (err) throw err;
            else console.log('Doctor Education updated');
            res.redirect('doctor-profile.html');
          });

        // let query2 = { _id: req.session.id };

        // database
        // .collection('sessions')
        // .updateOne(query2, addedu1, (err, result) => {
        //   if (err) throw err;
        //   else console.log('Session Exp updated');
        // });
      }
    });
});
//doctor update exp
router.post('/updateexp', (req, res) => {
  let expindex = req.body.index;
  let expposition = req.body.expposition;
  let exphospital = req.body.exphospital;
  let expduration = req.body.expduration;
  let newValue = {
    $set: {
      ['_experience.' + expindex]: {
        _Position: expposition,
        _HospitalName: exphospital,
        _Duration: expduration,
      },
    },
  };
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

        database
          .collection('DoctorClass')
          .updateOne(query, newValue, (err, result) => {
            if (err) throw err;
            else console.log('Updated');
            res.redirect('doctor-profile.html');
          });
      }
    });
});

//doctor delete exp
router.post('/deleteexp', (req, res) => {
  let expindex = req.body.index;
  let nullvalue = {
    $unset: {
      ['_experience.' + expindex]: 1,
    },
  };
  let removevalue = {
    $pull: {
      _experience: null,
    },
  };
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

        database
          .collection('DoctorClass')
          .updateOne(query, nullvalue, (err, result) => {
            if (err) throw err;
            else {
              database
                .collection('DoctorClass')
                .updateOne(query, removevalue, (err, result) => {
                  if (err) throw err;
                  else console.log('deleted');
                  res.redirect('doctor-profile.html');
                });
            }
          });
      }
    });
});

//doctor update edu
router.post('/updateedu', (req, res) => {
  let eduindex = req.body.index;
  let eduuni = req.body.eduuni;
  let edudegree = req.body.edudegree;
  let newValue = {
    $set: {
      ['_education.' + eduindex]: {
        _UniName: eduuni,
        _Degree: edudegree,
      },
    },
  };
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

        database
          .collection('DoctorClass')
          .updateOne(query, newValue, (err, result) => {
            if (err) throw err;
            else console.log('Edu Updated');
            res.redirect('doctor-profile.html');
          });
      }
    });
});



//doctor delete edu
router.post('/deleteedu', (req, res) => {
  let eduindex = req.body.index;
  let nullvalue = {
    $unset: {
      ['_education.' + eduindex]: 1,
    },
  };
  let removevalue = {
    $pull: {
      _education: null,
    },
  };
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

        database
          .collection('DoctorClass')
          .updateOne(query, nullvalue, (err, result) => {
            if (err) throw err;
            else {
              database
                .collection('DoctorClass')
                .updateOne(query, removevalue, (err, result) => {
                  if (err) throw err;
                  else console.log('deleted');
                  res.redirect('doctor-profile.html');
                });
            }
          });
      }
    });
});

router.post('/docinfo', (req,res)=>{
  let docname = req.body.docname;
  let docfee = req.body.docfee;
  let newValue = {
    $set: { _name: docname, _fees: docfee},
  };

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
        database
          .collection('DoctorClass')
          .find(query)
          .toArray((err, patient) => {
            if (err) throw err;
            else {
              database
                .collection('DoctorClass')
                .updateMany(query, newValue, (err, result) => {
                  if (err) throw err;
                  else {
                    console.log('personal info updated');
                  }

                  res.redirect('/doctor-profile.html');
                });
            }
          });
      }
    });
})

module.exports = router;
