const express = require('express');
const multer = require('multer'); //for handling uploads
const path = require('path');
const router = express.Router();
const db = require('../db/dbConfig');

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './public/team_logo');
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage }).single('file');

//display all projects
router.get('/get', (req, res) => {
  const sqlGet = 'SELECT * FROM presentation';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

// display project by ID
router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = 'SELECT * FROM presentation WHERE presentationID = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    res.send(result);
  });
});

router.post('/add', (req, res) => {
  upload(req, res, (err) => {
    const {
      title,
      description,
      teamName,
      host,
      date,
      time,
      mode,
      location,
      status,
      staffID,
      unitID,
    } = req.body;
    var filepath = '';

    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (req.file) {
      filepath = '/team_logo/' + req.file.filename;
    }

    const sqlInsert =
      'INSERT INTO presentation (title, description, teamName, teamLogo, host, date, time, mode, location, status, staffID, unitID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(
      sqlInsert,
      [
        title,
        description,
        teamName,
        filepath,
        host,
        date,
        time,
        mode,
        location,
        status,
        staffID,
        unitID,
      ],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send(); //when query is not successsful
        }
      }
    );
    return res.end('OK');
  });
});

//update presentation
router.put('/update/:id', (req, res) => {
  upload(req, res, (err) => {
    const { id } = req.params;
    const {
      title,
      description,
      teamName,
      host,
      date,
      time,
      mode,
      location,
      status,
      staffID,
      unitID,
    } = req.body;

    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    var filepath = '';
    if (!req.file) {
      filepath = req.body.file;
    } else {
      filepath = '/team_logo/' + req.file.filename;
    }

    const sqlUpdate =
      'UPDATE presentation SET title = ?, description = ?, teamName = ?, teamLogo = ?, host = ?, date = ?, time = ?, mode = ?, location = ?, status = ?, staffID = ?, unitID = ? WHERE presentationID = ?';
    db.query(
      sqlUpdate,
      [
        title,
        description,
        teamName,
        filepath,
        host,
        date,
        time,
        mode,
        location,
        status,
        staffID,
        unitID,
        id,
      ],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send(); //when query is not successsful
        }
      }
    );
    return res.end('OK');
  });
});

//delete presentation
router.delete('/remove/:id', (req, res) => {
  const { id } = req.params;

  const sqlCheck =
    'SELECT COUNT(*) FROM presenter_assigned WHERE presentationID = ?';
  db.query(sqlCheck, id, (error, result) => {
    if (!error) {
      if (result[0]['COUNT(*)'] > 0) {
        return res.status(403).json({
          error: true,
          message:
            'Cannot be deleted as there are presenters assigned to this presentation',
        });
      } else {
        const sqlRemove = 'DELETE FROM presentation WHERE presentationID = ?';
        db.query(sqlRemove, id, (error, result) => {
          if (error) {
            return res.status(500).send(); //when query is not successsful
          }
          res.end('OK');
        });
      }
    } else {
      return res.status(500).send(); //when query is not successsful
    }
  });
});

//To view file proposal
router.get('/download', (req, res) => {
  const { file } = req.query;
  const filename = path.basename(file);
  res.download('.' + file, filename);
});

//export this router to use in our index.js
module.exports = router;
