require('dotenv');
const express = require('express');
const router = express.Router();
const path = require('path');

// const app = require('../app');

let { uri, getDB } = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.sendFile(path.resolve('public/login.html'));
  }
};

const getCollection = (collection, email, res) => {
  database
    .collection(collection)
    .find(email)
    .toArray((err, result) => {
      if (err) res.json({ statusCode: 400, message: err });
      else res.json({ statusCode: 200, data: result, message: 'Success' });
    });
};

router.get('/', isAuth, (req, res) => {
  console.log(req.session.id);
  res.sendFile(path.resolve('public/homepage.html'));
});

router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let query = {
    _email: `${email}`,
  };

  database
    .collection('Patient')
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      if (result[0]) {
        if (result[0]._password == password) {
          req.session.isAuth = true;
          req.session.userData = result[0];
          res.redirect('/?sessionID=' + req.session.id);
        }
      }
    });

  database
    .collection('DoctorClass')
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      if (result[0]) {
        if (result[0]._password == password) {
          req.session.isAuth = true;
          req.session.userData = result[0];
          res.redirect('/?sessionID=' + req.session.id);
        }
      }
    });
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

router.post('/api/userData', (req, res) => {
  database
    .collection('sessions')
    .find({ _id: req.session.id })
    .toArray((err, result) => {
      if (err) throw err;
      if (result[0]) {
        let email = result[0].session.userData._email;
        if (result[0].session.userData._user == 'patient')
          getCollection('Patient', { _email: email }, res);
        else if (result[0].session.userData._user == 'doctor')
          getCollection('DoctorClass', { _email: email }, res);
        else console.log('No user found');
      }
    });
});

router.get('/api/homepage', (req, res) => {
  getCollection('homepage', {}, res);
});

router.post('/sessions', (req, res) => {
  database
    .collection('sessions')
    .find({ _id: req.session.id })
    .toArray((err, result) => {
      if (err) throw err;
      else res.json({ statusCode: 200, data: result, message: 'Success' });
    });
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

router.get('/viewProfile', (req, res) => {
  res.sendFile(path.resolve('public/doctor-profile.html'));
});

router.post('/viewProfile', (req, res) => {
  database
    .collection('DoctorClass')
    .find({ _email: req.body.email })
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
  res.redirect('/viewProfile');
});

router.post('/signup', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let sex = req.body.sex;
  let dob = req.body.dob;
  let password = req.body.password;
  let phone = req.body.phoneCode + req.body.phone;
  const birthYear = new Date(dob).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  const Patient = mongoose.model('Patient', PatientClassSchema);

  const patientData = new Patient({
    _age: `${age}`,
    _dob: `${dob}`,
    _email: `${email}`,
    _name: `${name}`,
    _phone: `${phone}`,
    _password: `${password}`,
    _sex: `${sex}`,
    _schedule: [
      {
        _date: '01/01/2001',
        _from: '10 AM',
        _to: '11 AM',
        _status: 'BooKed',
        _doctorName: 'ABC XYZ',
      },
    ],
  });

  database.collection('Patient').insertOne(patientData);
  res.sendFile('public/login.html', {
    root: __dirname,
  });
});

module.exports = router;
