const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');

router.get('/get', (req, res) => {
  const sqlGet = 'SELECT * FROM presentation';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

router.get('/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = 'SELECT * FROM presentation WHERE presentationID = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

router.post('/registration/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const affiliation = req.body.affiliation;
  const category = req.body.category;
  const orgName = req.body.orgName;
  const email = req.body.email;
  const presentationID = req.body.presentationID;

  //check if empty strings
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

  const sqlInsert =
    'SET collation_connection = "utf8mb4_0900_ai_ci";' +
    'SET @firstName = ?, @lastName = ?, @email = ?, @affiliation = ?, @category = ?, @orgName = ?; ' +
    'INSERT INTO visitor (firstName, lastName, email, affiliation, category, orgName) VALUES (@firstName, @lastName, @email, @affiliation, @category, @orgName) ' +
    'ON DUPLICATE KEY UPDATE ' +
    'firstName = @firstName, lastName = @lastName, affiliation = @affiliation, category = @category, orgName = @orgName; ' +
    'SET @date = curdate(), @presentationID = ?, @visitorID = (SELECT visitorID FROM visitor WHERE email = @email); ' +
    'INSERT INTO registration (date, presentationID, visitorID) ' +
    'SELECT * FROM (SELECT @date AS date, @presentationID AS presentationID,  @visitorID AS visitorID) AS temp ' +
    'WHERE NOT EXISTS (' +
    'SELECT presentationID, visitorID FROM registration WHERE presentationID = @presentationID AND visitorID = @visitorID) LIMIT 1;';

  //here we need to pass the array of data
  db.query(
    sqlInsert,
    [
      firstName,
      lastName,
      email,
      affiliation,
      category,
      orgName,
      presentationID,
    ],
    (error, result) => {
      if (error) {
        return res.status(500).send(); //when query is not successsful
      }
      res.end('OK');
    }
  );
});

router.post('/assessment/', (req, res) => {
  const email = req.body.email;
  const presentationID = req.body.presentationID;
  const c1 = req.body.c1;
  const c2 = req.body.c2;
  const c3 = req.body.c3;
  const c4 = req.body.c4;
  const c5 = req.body.c5;
  const c6 = req.body.c6;
  const c7 = req.body.c7;
  const c8 = req.body.c8;
  const c9 = req.body.c9;
  const c10 = req.body.c10;
  const comments = req.body.comments;

  //check if null
  if (!c1 || !c2 || !c3 || !c4 || !c5 || !c6 || !c7 || !c8 || !c9 || !c10) {
    return res.status(400).json({
      error: true,
      message: 'Please fill in all required fields',
    });
  }

  //check if the email of assessor is registered
  new Promise((resolve, reject) => {
    const sqlGetId =
      'SELECT visitorID FROM registration WHERE presentationID = ? AND visitorID IN (SELECT visitorID from visitor WHERE email = ?);';

    db.query(sqlGetId, [presentationID, email], (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).send(); //when query is not successsful
      } else {
        resolve(result[0]['visitorID']);
      }
    });
  }).then((visitorID) => {
    const sqlInsert =
      'INSERT INTO assessment (criterion1, criterion2, criterion3, criterion4, criterion5, criterion6, criterion7, criterion8, criterion9, criterion10, comment, visitorID, presentationID) ' +
      'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);';
    db.query(
      sqlInsert,
      [
        c1,
        c2,
        c3,
        c4,
        c5,
        c6,
        c7,
        c8,
        c9,
        c10,
        comments,
        visitorID,
        presentationID,
      ],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send(); //when query is not successsful
        }
        res.end('OK');
      }
    );
  });
});

router.post('/assessment/checkemail', (req, res) => {
  const email = req.body.email;
  const presentationID = parseInt(req.body.presentationID);

  if (!email.trim()) {
    return res.status(400).json({
      error: true,
      message: 'Please fill in your email',
    });
  }

  const sqlCheckEmail =
    'SELECT * FROM registration INNER JOIN visitor ON (registration.visitorID = visitor.visitorID) WHERE registration.presentationID = ? AND visitor.email = ?;';

  db.query(sqlCheckEmail, [presentationID, email], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    } else if (result.length == 0) {
      return res.status(401).json({
        error: true,
        message: 'Provided email is not registered to this presentation',
      });
    } else {
      res.send(result);
    }
  });
});

router.post('/assessment/checkemail/record', (req, res) => {
  const visitorID = parseInt(req.body.visitorID);
  const presentationID = parseInt(req.body.presentationID);

  const sqlCheckAssess =
    'SELECT COUNT(*) FROM assessment WHERE presentationID = ? AND visitorID = ?;';

  db.query(sqlCheckAssess, [presentationID, visitorID], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    } else if (result[0]['COUNT(*)'] > 0) {
      return res.status(401).json({
        error: true,
        message: 'You have already submitted an assessment',
      });
    } else {
      res.end('OK');
    }
  });
});

//check if student is valid to assess presentation
router.post('/assessment/checkstudent', (req, res) => {
  const studentID = req.body.studentID;
  const presentationID = parseInt(req.body.presentationID);

  if (!studentID) {
    return res.status(400).json({
      error: true,
      message: 'Please fill in your student number',
    });
  }
  const sqlCheckStudent =
    'SELECT COUNT(*) FROM presenter_assigned WHERE presentationID = ? AND studentID = "STU-" + ?;';

  db.query(sqlCheckStudent, [presentationID, studentID], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    } else if (result[0]['COUNT(*)'] > 0) {
      return res.status(401).json({
        error: true,
        message: 'Student number is not allowed to assess this presentation',
      });
    }
    res.end('OK');
  });
});

//export this router to use in our index.js
module.exports = router;
