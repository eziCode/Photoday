const express = require('express');
const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')
const mysql = require('mysql2');
const exp = require('constants');

const users = []

var connection = {"none": "none"};

app.use(express.json({limit: '10mb'}))
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));
app.use('/uploads', express.static('uploads'));

// var connection = mysql.createConnection({
//   host: '104.198.193.236',
//   user: 'root',
//   password: 'test1234',
//   database: 'Journal'
// });

// connection.connect;

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
    const name = req.body.name;
    const email = req.body.email;
    const userExists = users.some(user => user.name === req.body.username);
    if (userExists) {
      return res.status(400).send('User already exists');
    }
    connection.query(
      'INSERT INTO User(UserID, Name, Account_Creation_Date, Age, Email_Address, Birthday)',
      [user.name, name, new Date(), 0, email, new Date()],
      (err, results) => {
        if (err) {
          console.log("Error occured while creating user: ", err);
          res.status(500).send('Error');
        } else {
          res.status(201).send('Success');
        }
      }
    );
    users.push(user)
    res.status(201).send('Success')
  } catch {
    res.status(500).send('Error')
  }
})

app.post('/users/delete_account', async (req, res) => {
  try {
    const user_name = req.body.user_name;
    connection.query(
      'DELETE FROM User WHERE UserID = ?',
      [user_name],
      (err, results) => {
        if (err) {
          console.log("Error occured while deleting user: ", err);
          res.status(500).send('Error');
        } else {
          res.status(201).send('Success');
          const deleted_user = users.filter(user => user.name === req.body.username);
          if (deleted_user !== -1) {
            users.splice(deleted_user, 1);
          }
          delete deleted_user.password;
        }
      }
    );
  } catch {
    res.status(500).send('Error')
  }
});

app.post('/users/test_path', async (req, res) => {
  res.status(201).send('Success');
})

app.post('/users/insert_entry', async (req, res) => {
  try {
    const name = req.body.name;
    const mood = req.body.entry.emotions.mood;
    const sleep_amount = req.body.entry.emotions.sleep_amount;
    const photo_data = req.body.entry.photo.photo;
    const photo_caption = req.body.entry.photo.caption;
    const creation_date = req.body.entry.creation_date;
    const emotionUUID = uuidv4();
    const photoUUID = uuidv4();
    const entryUUID = uuidv4();
    connection.query(
      'INSERT INTO Entry (EntryID, Entry_Creation_Date, UserID, EmotionID, PhotoID, Sleep_Amount) VALUES (?, ?, ?, ?, ?, ?)',
      [entryUUID, creation_date, name, emotionUUID, photoUUID, sleep_amount],
      (err, results) => {
        if (err) {
          console.log("Error occured while inserting entry: ", err);
          res.status(500).send('Error');
        } else {
          connection.query(
            'INSERT INTO Emotions (EmotionID, Emotion_Creation_Date, Type, Value, EntryID) VALUES (?, ?, ?, ?, ?)',
            [emotionUUID, new Date(), mood, "nah", entryUUID],
            (err, results) => {
              if (err) {
                console.log("Error occured while inserting emotion: ", err);
                res.status(500).send('Error');
              } else {
                connection.query(
                  'INSERT INTO Photo (PhotoID, Photo_Creation_Date, Caption, Reference_URL, EntryID) VALUES (?, ?, ?, ?, ?)',
                  [photoUUID, new Date(), photo_caption, photo_data, entryUUID],
                  (err, results) => {
                    if (err) {
                      console.log("Error occured while inserting photo: ", err);
                      res.status(500).send('Error');
                    } else {
                      res.status(201).send('Success');
                    }
                  }
                );
              }
            }
          );
          res.status(201).send('Success');
        }
      }
    );
  } catch {
    res.status(500).send('Error')
  }
})

app.post('/users/change_email', async (req, res) => {
  try {
    const newEmail = req.body.email;
    const userName = req.body.user_name;
    connection.query(
      'UPDATE User SET Email_Address = ? WHERE UserID = ?',
      [newEmail, userName],
      (err, results) => {
        if (err) {
          console.log("Error occured while changing email: ", err);
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

app.post('/users/change_name', async (req, res) => {
  try {
    const name = req.body.email;
    const user_name = req.body.user_name;
    connection.query(
      'UPDATE User SET Name = ? WHERE UserID = ?',
      [name, user_name],
      (err, results) => {
        if (err) {
          console.log("Error occured while changing name: ", err);
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