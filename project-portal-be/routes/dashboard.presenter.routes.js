const { response } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

//display all presenters
router.get('/api/get/presenterdetails', (req, res) => {
  const sqlGet = 'SELECT * FROM presenter';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

// display a presenter by their studdent ID
router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = 'SELECT * FROM presenter WHERE studentID = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    res.send(result);
  });
});

//add new presenter details
router.post('/add', (req, res) => {
  const { studentID, firstName, lastName, email } = req.body;

  //check if empty strings
  if (!studentID || !firstName.trim() || !lastName.trim() || !email.trim()) {
    return res.status(400).json({
      error: true,
      message: 'Please fill in all required fields',
    });
  }

  const sqlCheck = 'SELECT * FROM presenter WHERE studentID = ?';
  db.query(sqlCheck, ['STU-' + studentID], (error, result) => {
    if (!error) {
      if (result.length > 0) {
        return res.status(409).json({
          error: true,
          sData: result[0],
        });
      } else {
        const sqlInsert =
          'INSERT INTO presenter (studentID, firstName, lastName, email) VALUES (?, ?, ?, ?)';
        db.query(
          sqlInsert,
          ['STU-' + studentID, firstName, lastName, email],
          (error, result) => {
            if (error) {
              console.log(error);
              return res.status(500).send(); //when query is not successsful
            }
            return res.status(200).send();
          }
        );
      }
    } else {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
  });
});

//update presenter details by their student ID
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  if (!firstName.trim() || !lastName.trim() || !email.trim()) {
    return res.status(400).json({
      error: true,
      message: 'Please fill in all required fields',
    });
  }

  const sqlUpdate =
    'UPDATE presenter SET firstName = ?, lastName = ?, email = ?  WHERE studentID = ?';

  db.query(sqlUpdate, [firstName, lastName, email, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    res.end('OK');
  });
});

//updates the presenter_assigned table
router.post('/assigned/add', (req, res) => {
  const { presentationID, studentID } = req.body;

  const sqlCheck =
    'SELECT * FROM presenter_assigned WHERE presentationID = ? AND studentID = ?';
  db.query(sqlCheck, [presentationID, studentID], (error, result) => {
    if (!error) {
      if (result.length > 0) {
        return res.status(409).json({
          error: true,
          message: 'Student is already assigned for this presentation',
        });
      } else {
        const sqlInsert =
          'INSERT INTO presenter_assigned (presentationID, studentID) VALUES (?, ?)';
        db.query(sqlInsert, [presentationID, studentID], (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500).send(); //when query is not successsful
          }
          res.end('OK');
        });
      }
    } else {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
  });
});

//display presenters assigned for the presentation ID
router.get('/assigned/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet =
    'SELECT presenter_assigned.*, presenter.firstName, presenter.lastName, presenter.email' +
    ' FROM presenter_assigned LEFT JOIN presenter' +
    ' ON (presenter.studentID = presenter_assigned.studentID)' +
    ' WHERE presentationID = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    res.send(result);
  });
});

//unassign presenter from a presentation
router.delete('/assigned/remove/:presentationID/:id', (req, res) => {
  const { presentationID, id } = req.params;

  const sqlRemove =
    'DELETE FROM presenter_assigned WHERE presentationID = ? AND studentID = ?';
  db.query(sqlRemove, [presentationID, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    res.end('OK');
  });
});

//display all units
router.get('/api/get/presenterassigneddetails', (req, res) => {
  const sqlGet = 'SELECT * FROM presenter_assigned';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

//export this router to use in our index.js
module.exports = router;
