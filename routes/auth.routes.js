const express = require("express")
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      })
    }
    else {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      })

      user.save()
        .then(result => {
          res.status(201).json({
            new_user: result
          })
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        })
    }
  })
})
router.post('/login', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).json({
          msg: 'user not found !!'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            msg: 'password does not match !!'
          })
        }
        if (result) {
          const token = jwt.sign({
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            email: user[0].email,
          },
            'this is a secret key',
            {
              expiresIn: "72h"
            }
          );
          res.status(200).json({
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            email: user[0].email,
            token: token,
          })
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        err: err
      })
    })
})

module.exports = router;