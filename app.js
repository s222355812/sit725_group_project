const express = require('express');
const app = express();
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

let { uri, getDB } = require('./dbConnect');
let projectRoutes = require('./routes/projectRoutes');

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: new MongoDBSession({
      uri: uri,
      collection: 'sessions',
    }),
  })
);
app.post('/login', projectRoutes);

module.exports = app;
