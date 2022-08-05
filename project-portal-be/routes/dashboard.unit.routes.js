const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

//display all units
router.get('/get', (req, res) => {
  const sqlGet = 'SELECT * FROM unit';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

//display unit by ID
router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = 'SELECT *  FROM unit WHERE unitID = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    res.send(result);
  });
});

//insert unit
router.post('/add', (req, res) => {
  const { unitCode, unitName, discipline } = req.body;

  if (!unitCode.trim() || !unitName.trim() || !discipline.trim()) {
    return res.status(400).json({
      error: true,
      message: 'Please fill in all required fields',
    });
  }

  const sqlCheck = 'SELECT unitCode FROM unit WHERE unitCode = ?';
  db.query(sqlCheck, unitCode, (error, result) => {
    if (!error) {
      if (result.length == 0) {
        const sqlInsert =
          'INSERT INTO unit (unitCode, unitName, discipline) VALUES (?, ?, ?)';
        db.query(
          sqlInsert,
          [unitCode, unitName, discipline],
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
          message: 'Unit Code already exists, try a different one',
        });
      }
    } else {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
  });
});

//delete unit
router.delete('/remove/:id', (req, res) => {
  const { id } = req.params;
  const sqlRemove = 'DELETE FROM unit WHERE unitID = ?';
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    res.end('OK');
  });
});

//update unit
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { unitCode, unitName, discipline } = req.body;

  if (!unitCode.trim() || !unitName.trim() || !discipline.trim()) {
    return res.status(400).json({
      error: true,
      message: 'Please fill in all required fields',
    });
  }

  const sqlCheck = 'SELECT unitCode FROM unit WHERE unitCode = ?';
  db.query(sqlCheck, unitCode, (error, result) => {
    if (!error) {
      if (result.length == 0) {
        const sqlUpdate =
          'UPDATE unit SET unitCode = ?, unitName = ?, discipline = ? WHERE unitID = ?';
        db.query(
          sqlUpdate,
          [unitCode, unitName, discipline, id],
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
          message: 'Unit Code already exists, try a different one',
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
