const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

router.get('/get', (req, res) => {
  const sqlGet = 'SELECT * FROM visitor';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = 'SELECT * FROM visitor WHERE visitorID = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

router.delete('/remove/:id', (req, res) => {
  const { id } = req.params;
  const sqlRemove = 'DELETE FROM visitor WHERE visitorID = ?';
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    res.end('OK');
  });
});

router.post('/visitors', (req, res) => {
  const visitors = req.body.visitors.replace(/[\[\]']+/g, '');
  const sqlGet =
    'SELECT email FROM visitor WHERE visitorID IN (' + visitors + ')';
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.status(200).send(result);
  });
});

//export this router to use in our index.js
module.exports = router;
