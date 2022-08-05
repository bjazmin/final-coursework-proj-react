const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');
const generator = require('generate-password');

//display all staff
router.get('/get', (req, res) => {
  const sqlGet = 'SELECT * FROM staff';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

//display staff by ID
router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = 'SELECT *  FROM staff WHERE staffID = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    res.send(result);
  });
});

//insert staff
router.post('/add', (req, res) => {
  const { staffID, firstName, lastName, email, accessType } = req.body;
  const password = generator.generate({
    length: 10,
    numbers: true,
  });

  if (
    !staffID.trim() ||
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim()
  ) {
    return res.status(400).json({
      error: true,
      message: 'Please fill in all required fields',
    });
  }

  const sqlCheck = 'SELECT staffID FROM staff WHERE staffID = ?';
  db.query(sqlCheck, 'STA-' + staffID, (error, result) => {
    if (!error) {
      if (result.length == 0) {
        const sqlInsert =
          'INSERT INTO staff (staffID, firstName, lastName, email, password, accessType) VALUES (?, ?, ?, ?, ?, ?)';

        db.query(
          sqlInsert,
          ['STA-' + staffID, firstName, lastName, email, password, accessType],
          (error, result) => {
            if (error) {
              console.log(error);
              return res.status(500).send(); //when query is not successsful
            }
            res.status(200).json({ password: password });
          }
        );
      } else {
        return res.status(409).json({
          error: true,
          message: 'Staff ID already exists, try a different one',
        });
      }
    } else {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
  });
});

//delete staff
router.delete('/remove/:id', (req, res) => {
  const { id } = req.params;

  const sqlRemove = 'DELETE FROM staff WHERE staffID = ?';
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      if (error.errno === 1451) {
        return res.status(403).json({
          error: true,
          message:
            'Cannot be deleted as there are records created by this user',
        });
      } else {
        return res.status(500).send(); //when query is not successsful
      }
    }
    res.end('OK');
  });
});

router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { staffID, firstName, lastName, email, accessType } = req.body;

  if (
    !staffID.trim() ||
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim()
  ) {
    return res.status(400).json({
      error: true,
      message: 'Please fill in all required fields',
    });
  }

  const sqlCheck = 'SELECT staffID FROM staff WHERE staffID = ?';
  db.query(sqlCheck, 'STA-' + staffID, (error, result) => {
    if (!error) {
      if (result.length == 0) {
        const sqlUpdate =
          'UPDATE staff SET staffID = ?, firstName = ?, lastName = ?, email = ?, accessType = ? WHERE staffID = ?';
        db.query(
          sqlUpdate,
          [staffID, firstName, lastName, email, accessType, id],
          (error, result) => {
            if (error) {
              console.log(error);
              return res.status(500).send(); //when query is not successsful
            }
            res.end('OK');
          }
        );
      } else {
        return res.status(409).json({
          error: true,
          message: 'Staff ID already exists, try a different one',
        });
      }
    } else {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
  });
});

router.put('/resetpassword/:id', (req, res) => {
  const { id } = req.params;
  const password = generator.generate({
    length: 10,
    numbers: true,
  });

  const sqlUpdate = 'UPDATE staff SET password = ? WHERE staffID = ?';
  db.query(sqlUpdate, [password, id], (error, result) => {
    if (!error) {
      return res.status(200).json({
        password: password,
      });
    } else {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
  });
});

//export this router to use in our index.js
module.exports = router;
