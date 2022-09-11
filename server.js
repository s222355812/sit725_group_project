const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log('App running at http://localhost:' + port);
});
