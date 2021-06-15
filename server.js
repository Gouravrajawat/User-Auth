const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require('dotenv');
const app = express();
const { Mongoose } = require('mongoose');
const cors = require("cors");
const port = process.env.PORT || 8080;
const connectDB = require('./config/db');
const AuthRoute = require('./routes/auth.routes');
dotenv.config({ path: './config/config.env' });

connectDB();

const usersDatabase = [
  { email: "gourav@gmail.com", password: "gourav" },
  { email: "mayank@gmail.com", password: "mayank" },
  { email: "vikas@gmail.com", password: "vikas" },
];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

/*
app.post("/api/login", (req, res) => {
  var user = req.body;
  try {
    if (
      usersDatabase.find(
        (u) => u.email === user.email && u.password === user.password
      )
    ) {
      res.status(200).json({
        email: user.email,
        token: "thisisatoken",
      });
    } else res.status(400).json("Wrong Username or Password");
  } catch (error) {
    res.status(500).json(error);
  }
});
app.post("/api/signup", (req, res) => {
  var user = req.body.newUser;
  try {
    if (
      usersDatabase.find(
        (u) => u.email === user.email && u.password === user.password
      )
    )
      res.status(400).json("User already exists");
    else {
      usersDatabase.push(user);
      console.log(usersDatabase);
      res.status(201).json("User added");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
const queryLogout = (user) => {
  return new Promise((resolve, reject) => {
    if (
      usersDatabase.find((u) => u.email === user.email) &&
      user.token === "thisisatoken"
    ) {
      let response = {
        success: true,
        errorMessage: null,
      };
      resolve(response);
    } else {
      let response = {
        success: false,
        errorMessage: "Wrong username/token",
      };
      reject(response);
    }
  });
};
app.post("/api/logout", (req, res) => {
  let timer = Math.random() * 2000 + 1000;
  queryLogout(req.body)
    .then((outcome) => {
      setTimeout(() => res.json(outcome), timer);
    })
    .catch((error) => {
      setTimeout(() => res.json(error), timer);
    });
});
*/ //No need of them any more.

app.get('/api', (req, res) => {
  res.send('Listening')
})

app.use('/api/user/', AuthRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));

