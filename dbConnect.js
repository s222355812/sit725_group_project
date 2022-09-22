const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const uri =
  'mongodb+srv://getdocteam:sit725@mycluster.uawhx6v.mongodb.net/getdoc?retryWrites=true&w=majority';

let getDB = new Promise((resolve, reject) => {
  MongoClient.connect(uri, { useNewURLParser: true }, (err, result) => {
    if (err) {
      reject(err);
      console.log('MongoDB error catch');
    } else {
      resolve(result.db('getdoc'));
      console.log('MongoDB connection successful');
    }
  });
});

mongoose.connect(uri, { useNewUrlParser: true }, (err) => {
  if (err) {
    throw err;
  } else {
    console.log('Mongoose connection successful');
  }
});

module.exports = { uri, getDB };
