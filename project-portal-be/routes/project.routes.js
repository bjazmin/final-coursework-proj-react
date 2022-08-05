const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/dbConfig');

router.get('/get', (req, res) => {
  const sqlGet = 'SELECT * FROM project';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = 'SELECT * FROM project WHERE projectID = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    res.send(result);
  });
});

//To download file proposal
router.get('/download/:id', (req, res) => {
  const { id } = req.params;

  const sqlGet = 'SELECT file FROM project WHERE projectID = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    const filename = path.basename(result[0].file);
    res.download('.' + result[0].file, filename);
  });
});

//export this router to use in our index.js
module.exports = router;
