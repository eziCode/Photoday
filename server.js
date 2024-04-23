const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')
const mysql = require('mysql12');

app.use(express.json())
app.use(cors())

const users = []

// var connection = mysql.createConnection({
//   host: '',
//   user: '',
//   password: '',
//   database '',
// });

/*

RUN SERVER: forever start server.js
STOP SERVER: forever stop server.js

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

app.listen(3000)