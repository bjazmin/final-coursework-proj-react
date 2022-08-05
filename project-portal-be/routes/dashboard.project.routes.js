const express = require('express');
const multer = require('multer'); //for handling uploads
const path = require('path');
const router = express.Router();
const db = require('../db/dbConfig');

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.fieldname === 'file') {
      callback(null, './uploads/project');
    } else {
      callback(null, './public/project_banner');
    }
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage });

var multipleUpload = upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
]);

//display all projects
router.get('/get', (req, res) => {
  const sqlGet = 'SELECT * FROM project';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

// display project by ID
router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = 'SELECT * FROM project WHERE projectID = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

router.post('/add', multipleUpload, (req, res) => {
  const { title, description, projectTeam, staffID, unitID } = req.body;

  if (!req.files.file) {
    return res.status(400).json({
      error: true,
      message: 'Please upload a project file',
    });
  }

  const filepath = '/uploads/project/' + req.files.file[0].filename;

  var bannerpath = '';
  if (req.files.banner) {
    bannerpath = '/project_banner/' + req.files.banner[0].filename;
  }

  const sqlInsert =
    'INSERT INTO project (title, description, projectTeam, file, projectBanner, staffID, unitID) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(
    sqlInsert,
    [title, description, projectTeam, filepath, bannerpath, staffID, unitID],
    (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send(); //when query is not successsful
      }
    }
  );
  return res.end('OK');
});

//update project
router.put('/update/:id', multipleUpload, (req, res) => {
  const { id } = req.params;
  const { title, description, projectTeam, staffID, unitID } = req.body;

  console.log(req.files);
  var filepath = '';
  var bannerpath = '';

  //if there is no new file uploaded, keep the previous filename
  if (!req.files.file) {
    filepath = req.body.file;
  } else {
    filepath = '/uploads/project/' + req.files.file[0].filename;
  }

  if (!req.files.banner) {
    bannerpath = req.body.banner;
  } else {
    bannerpath = '/project_banner/' + req.files.banner[0].filename;
  }

  const sqlUpdate =
    'UPDATE project SET title = ?, description = ?, projectTeam = ?, file = ?, projectBanner = ?, staffID = ?, unitID = ? WHERE projectID = ?';
  db.query(
    sqlUpdate,
    [
      title,
      description,
      projectTeam,
      filepath,
      bannerpath,
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

//delete project
router.delete('/remove/:id', (req, res) => {
  const { id } = req.params;
  const sqlRemove = 'DELETE FROM project WHERE projectID = ?';
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
    res.end('OK');
  });
});

//To download file proposal
router.get('/download', (req, res) => {
  const { file } = req.query;
  const filename = path.basename(file);
  res.download('.' + file, filename);
});

//export this router to use in our index.js
module.exports = router;
