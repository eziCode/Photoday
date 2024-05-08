const express = require('express');
const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')
const mysql = require('mysql2');
const json = require('body-parser');

app.use(express.json())
app.use(cors())

const users = []

var connection = mysql.createConnection({
  host: '104.198.193.236',
  user: 'root',
  password: 'test1234',
  database: 'Journal'
});

connection.connect;

/*

RUN SERVER: node server.js
STOP SERVER: alt + c (mac) / cmd + c (windows)

*/

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.username, password: hashedPassword }
    users.push(user)
    res.status(201).send('Success')
  } catch {
    res.status(500).send('Error')
  }
})

app.post('/users/insert_entry', async (req, res) => {
  try {
    const name = req.body.name;
    const mood = req.body.emotinos.mood;
    const sleep_amount = req.body.emotions.sleep_amount;
    const photo_data = req.body.photo.photo;
    const photo_caption = req.body.photo.caption;
    const creation_date = req.body.entry.creation_date;
    connection.query(
      'INSERT INTO... ',
      [fields],
      (err, results) => {
        if (err) {
          console.log("Error occured while inserting entry: ", err);
          res.status(500).send('Error');
        } else {
          res.status(201).send('Success');
        }
      }
    );
  } catch {
    res.status(500).send('Error')
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.username)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})