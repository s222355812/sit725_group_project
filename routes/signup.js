const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const patient = require("../Model/PatientModel");
let {
  createPatient
} =require('../Controller/PatientController')

let {
  getDB
} = require('../dbConnect');
let database;
getDB.then((result) => {
  database = result;
});

router.post('/signup', (req, res) => {
  createPatient(req, (err, result) =>  {
  res.redirect('/login.html');
 })
});

module.exports = router;
