const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();

let database;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Add database connection
const uri =
  'mongodb+srv://getdocteam:admin@mycluster.uawhx6v.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewURLParser: true });

const getCollection = (collection, res) => {
  database
    .collection(collection)
    .find({})
    .toArray((err, result) => {
      if (err) res.json({ statusCode: 400, message: err });
      else res.json({ statusCode: 200, data: result, message: 'Success' });
    });
};

// homepage collection
app.get('/api/homepage', (req, res) => {
  getCollection('homepage', res);
});

// docAppointment collection
app.get('/api/docAppointment', (req, res) => {
  getCollection('docAppointment', res);
});

// patientRatings collection
app.get('/api/patientRatings', (req, res) => {
  getCollection('patientRatings', res);
});

// docSched collection
app.get('/api/docSched', (req, res) => {
  getCollection('docSched', res);
});

// patientSched collection
app.get('/api/patientSched', (req, res) => {
  getCollection('patientSched', res);
});

// Login
app.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let query = { email: `${email}` };

  database
    .collection('userClass')
    .find(query)
    .toArray((err, result) => {
      if (err) throw err;
      if (result[0]) {
        if (result[0].password == password) {
          console.log(result[0]);
          res.sendFile('public/login-welcome.html', { root: __dirname });
        }
      }
    });
});

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log('App running at http://localhost:' + port);

  // Connect to MongoDB
  MongoClient.connect(uri, { useNewURLParser: true }, (err, result) => {
    if (err) throw err;
    database = result.db('getdoc');
    console.log('MongoDB connection successful');
  });
});
