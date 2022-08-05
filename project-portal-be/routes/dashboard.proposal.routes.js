const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/dbConfig');

router.get('/get', (req, res) => {
  const sqlGet = 'SELECT * FROM proposal';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = 'SELECT *  FROM proposal WHERE proposalID = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

router.delete('/remove/:id', (req, res) => {
  const { id } = req.params;
  const sqlRemove = 'DELETE FROM proposal WHERE proposalID = ?';
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    res.end('OK');
  });
});

router.get('/download/:id', (req, res) => {
  const { id } = req.params;

  const sqlGet = 'SELECT file FROM proposal WHERE proposalID = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    const filename = path.basename(result[0].file);
    res.download('.' + result[0].file, filename);
  });
});

//update unit
router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const discipline = req.body.discipline;
  const status = req.body.status;

  if (!status.trim()) {
    return res.status(400).json({
      error: true,
      message: 'Please fill in status',
    });
  }

  const sqlUpdate =
    'UPDATE proposal SET status = ?, discipline = ? WHERE proposalID = ?';
  db.query(sqlUpdate, [status, discipline, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    res.end('OK');
  });
});

//export this router to use in our index.js
module.exports = router;
