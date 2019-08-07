const express = require('express');
const path = require('path');
const app = express();

const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'pizza-schema'
});

connection.connect();

connection.query("INSERT INTO clients (nickname, email, password) " +
    "             VALUES ('ROFLAN', 'roflan@gmail.com', 'pass1234')", (err, rows) => {
  if (err) throw err;

  console.log(rows);
});

connection.query('SELECT * FROM clients', (err, rows) => {
  if (err) throw err;

  for (let k in rows) {
    console.log(rows[k]);
  }
}
);

connection.end();

app.route('/about').get((req, res) => {
  res.sendFile(path.join(__dirname + '/public/' + 'index.html'));
}).post((req, res) => {
  res.send('POST about');
}).put((req, res) => {
  res.send('PUT about');
});

app.listen(3000);