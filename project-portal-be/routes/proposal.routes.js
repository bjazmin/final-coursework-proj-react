const express = require('express');
const multer = require('multer'); //for handling uploads
const router = express.Router();
const db = require('../db/dbConfig');

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/proposal');
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage }).single('file');

router.post('/submit', (req, res) => {
  upload(req, res, (err) => {
    const title = req.body.title;
    const discipline = req.body.discipline;

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const affiliation = req.body.affiliation;
    const category = req.body.category;
    const orgName = req.body.orgName;

    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !affiliation.trim() ||
      !category.trim() ||
      !email.trim()
    ) {
      return res.status(400).json({
        error: true,
        message: 'Please fill in all required fields',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: 'Please upload the proposal file',
      });
    }

    const filepath = '/uploads/proposal/' + req.file.filename;

    const sqlInsert =
      'SET collation_connection = "utf8mb4_0900_ai_ci";' +
      'SET @firstName = ?, @lastName = ?, @email = ?, @affiliation = ?, @category = ?, @orgName = ?; ' +
      'INSERT INTO visitor (firstName, lastName, email, affiliation, category, orgName) VALUES (@firstName, @lastName, @email, @affiliation, @category, @orgName) ' +
      'ON DUPLICATE KEY UPDATE ' +
      'firstName = @firstName, lastName = @lastName, affiliation = @affiliation, category = @category, orgName = @orgName; ' +
      'SET @visitorID = (SELECT visitorID FROM visitor WHERE email = @email); ' +
      'INSERT INTO proposal (title, discipline, file, status, dateSubmitted, visitorID) VALUES(?, ?, ?, "Submitted", curdate(), @visitorID)';

    db.query(
      sqlInsert,
      [
        firstName,
        lastName,
        email,
        affiliation,
        category,
        orgName,
        title,
        discipline,
        filepath,
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

//export this router to use in our index.js
module.exports = router;
