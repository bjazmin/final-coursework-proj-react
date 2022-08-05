const express = require('express');
const jwt = require('jsonwebtoken'); //for handling web tokens
const router = express.Router();
const db = require('../db/dbConfig');
const utils = require('../utils/utils');

//middle ware for verifying the user token
const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];

  //if there's no token
  if (!token) {
    return res.status(400).json({
      error: true,
      message: 'Token is required',
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          message: 'Authentication failed',
        });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // return 400 status if username/password is not exist
  if (!email.trim() || !password) {
    return res.status(400).json({
      error: true,
      message: 'Username or Password required',
    });
  }

  const sqlGet = 'SELECT * FROM staff where email = ? AND password = ?';

  db.query(sqlGet, [email, password], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    if (result.length > 0) {
      const id = result[0].staffID;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2h',
      });

      req.session.user = result[0]; //user data including the password
      res.json({
        auth: true,
        token: token,
        roles: ['Administrator', 'Teaching Staff'],
        user: utils.getCleanUser(req.session.user),
      });
    } else {
      return res.status(401).json({
        error: true,
        auth: false,
        message: 'Email or Password is wrong.',
      });
    }
  });
});

router.get('/', (req, res) => {
  if (req.session.user) {
    res.json({
      loggedIn: true,
    });
  } else {
    res.json({
      loggedIn: false,
    });
  }
});

//middleware verifyJWT, when eve the endpoint is verify it authenticates, so every
router.get('/verifyuser', verifyJWT, (req, res) => {
  res.json({
    auth: true,
  });
});

router.put('/changepassword/:id', (req, res) => {
  const { id } = req.params;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  // return 400 status if username/password is not exist
  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      error: true,
      message: 'Please fill in your current or new password',
    });
  }

  const sqlGet = 'SELECT * FROM staff where staffID = ? AND password = ?';
  db.query(sqlGet, [id, currentPassword], (error, result) => {
    if (!error) {
      if (result.length > 0) {
        const sqlUpdate = 'UPDATE staff SET password = ? WHERE staffID = ?';
        db.query(sqlUpdate, [newPassword, id], (error, result) => {
          if (!error) {
            return res.end('OK');
          } else {
            console.log(error);
            return res.status(500).send(); //when query is not successsful
          }
        });
      } else {
        return res.status(401).json({
          error: true,
          message: 'Current Password is wrong',
        });
      }
    } else {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
  });
});

//export this router to use in our index.js
module.exports = router;
