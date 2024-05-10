const express = require('express');
const app = express()
const bcrypt = require('bcrypt')
const cors = require('cors')
const mysql = require('mysql2');

const users = []

app.use(express.json())
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

var connection = mysql.createConnection({
  connectionLimit: 10,
  host: '104.198.193.236',
  user: 'root',
  password: 'test1234',
  database: 'NewJournal'
});

connection.connect(function(err) {
  if (err) {
    console.log("Error occured while connecting to database: ", err);
    return;
  }
  console.log("Connected to database!");
});

/*

RUN SERVER: node server.js
STOP SERVER: alt + c (mac) / cmd + c (windows)

*/

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/users/search_by_caption', async (req, res) => {
  const name = req.query.name;
  const caption = req.query.caption;
  connection.query(
    'SELECT * FROM Entry WHERE UserID = ? AND PhotoID IN (SELECT PhotoID FROM Photo WHERE Caption = ?)',
    [name, caption],
    (err, results) => {
      if (err) {
        console.log("Error occured while searching by caption: ", err);
        res.status(500).send('Error');
      } else {
        res.status(201).send(results);
      }
    }
  );
})

app.get('/users/search_by_sleep', async (req, res) => {
  const name = req.query.name;
  const sleep = req.query.sleep;
  connection.query(
    'SELECT * FROM Entry WHERE UserID = ? AND Sleep_Amount = ?',
    [name, sleep],
    (err, results) => {
      if (err) {
        console.log("Error occured while searching by sleep: ", err);
        res.status(500).send('Error');
      } else {
        res.status(201).send(results);
      }
    }
  );
})

app.get('/users/search_by_mood', async (req, res) => {
  const name = req.query.name;
  const mood = req.query.mood;
  connection.query(
    'SELECT * FROM Entry WHERE UserID = ? AND EmotionID IN (SELECT EmotionID FROM Emotions WHERE Type = ?)',
    [name, mood],
    (err, results) => {
      if (err) {
        console.log("Error occured while searching by mood: ", err);
        res.status(500).send('Error');
      } else {
        res.status(201).send(results);
      }
    }
  );
})


app.get('/users/search_by_date', async (req, res) => {
  const name = req.query.name;
  const date = req.query.date;
  connection.query(
    'SELECT * FROM Entry WHERE UserID = ? AND Entry_Creation_Date = ?',
    [name, date],
    (err, results) => {
      if (err) {
        console.log("Error occured while searching by date: ", err);
        res.status(500).send('Error');
      } else {
        res.status(201).send(results);
      }
    }
  );
})

const submittedUsers = new Set();

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.username, password: hashedPassword };
    const name = req.body.name;
    const email = req.body.email;
    const userExists = users.some(user => user.name === req.body.username);
    if (userExists) {
      return res.status(400).send('User already exists');
    }
    if (submittedUsers.has(user.name)) {
      return res.status(400).send('User creation in progress');
    }
    connection.query(
      'INSERT INTO User(UserID, Name, Account_Creation_Date, Age, Email_Address, Birthday) VALUES (?, ?, ?, ?, ?, ?)',
      [user.name, name, "5/9/2024", 0, email, "8/3/2007"],
      (err, results) => {
        if (err) {
          console.log("Error occurred while creating user: ", err);
          return res.status(500).send('Error');
        }
        users.push(user);
        res.status(201).send('Success');
      }
    );
  } catch {
    res.status(500).send('Error');
  }
});

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
          const deleted_user = users.findIndex(user => user.name === req.body.username);
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

app.post('/users/insert_entry', async (req, res) => {
    const name = req.body.name;
    const mood = req.body.entry.emotions.mood;
    const sleep_amount = req.body.entry.emotions.sleep_amount;
    const photo_data = req.body.entry.photo.photo;
    const photo_caption = req.body.entry.photo.caption;
    const creation_date = req.body.entry.creation_date;
    const emotionUUID = Math.floor(Math.random() * 2147483647);
    const photoUUID = Math.floor(Math.random() * 2147483647);
    const entryUUID = Math.floor(Math.random() * 2147483647);
    connection.query(
      'INSERT INTO Emotions (EmotionID, Emotion_Creation_Date, Type, Value) VALUES (?, ?, ?, ?)',
      [emotionUUID, new Date(), mood, "nah"],
      (err, results) => {
        if (err) {
          console.log("Error occured while inserting emotion: ", err);
          res.status(500).send('Error on emotion insert');
        } else {
          connection.query(
            'INSERT INTO Photo (PhotoID, Photo_Creation_Date, Caption, Reference_URL) VALUES (?, ?, ?, ?)',
            [photoUUID, new Date(), photo_caption, photo_data, entryUUID],
            (err, results) => {
              if (err) {
                console.log("Error occured while inserting photo: ", err);
                res.status(500).send('Error on photo insert');
              } else {
                connection.query(
                  'INSERT INTO Entry (EntryID, Entry_Creation_Date, UserID, EmotionID, PhotoID, Sleep_Amount) VALUES (?, ?, ?, ?, ?, ?)',
                  [entryUUID, creation_date, name, emotionUUID, photoUUID, sleep_amount],
                  (err, results) => {
                    if (err) {
                      console.log("Error occured while inserting entry: ", err);
                      res.status(500).send('Error on entry insert');
                    } else {
                      res.status(201).send('Success');
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
    
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