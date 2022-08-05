const express = require('express');
const router = express.Router();
const db = require('../db/dbConfig');
const { Parser } = require('json2csv');

router.get('/get/registrations', (req, res) => {
  const sqlGet =
    'SELECT presentation.presentationID, presentation.title, count(registration.presentationID) as number_of_registrations' +
    ' FROM presentation LEFT JOIN registration' +
    ' ON (presentation.presentationID = registration.presentationID)' +
    ' GROUP BY presentation.presentationID';

  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

router.get('/get/presentations', (req, res) => {
  const sqlGet =
    'SELECT presentation.presentationID, presentation.title,' +
    ' count(assessment.presentationID) as number_of_assessments,' +
    ' count(registration.presentationID) as number_of_registrations' +
    ' FROM presentation' +
    ' LEFT JOIN assessment' +
    ' ON (presentation.presentationID = assessment.presentationID)' +
    ' LEFT JOIN registration' +
    ' ON (presentation.presentationID = registration.presentationID)' +
    ' GROUP BY presentation.presentationID';

  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

router.get('/get/presenters', (req, res) => {
  const sqlGet =
    'SELECT presentation.presentationID, presentation.status,' +
    ' COUNT(presenter_assigned.studentID) as number_of_presenters,' +
    ' SUM(COUNT(presenter_assigned.studentID)) OVER() as total' +
    ' FROM presentation' +
    ' LEFT JOIN presenter_assigned' +
    ' ON (presentation.presentationID = presenter_assigned.presentationID)' +
    ' LEFT JOIN presenter' +
    ' ON (presenter_assigned.studentID = presenter.studentID)' +
    ' WHERE presentation.status = "Upcoming" OR presentation.status = "Ongoing"' +
    ' GROUP BY presentation.presentationID';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

router.get('/assessment/export/:id', (req, res) => {
  const { id } = req.params;
  if (parseInt(id) <= 0) {
    return res.status(400).json({
      error: true,
      message: 'Please select valid presentation',
    });
  }

  const sqlGet =
    'SELECT assessment.*,' +
    ' visitor.firstName, visitor.lastName, visitor.email, visitor.affiliation, visitor.category, visitor.orgName' +
    ' FROM assessment, visitor' +
    ' WHERE assessment.presentationID = ? AND assessment.visitorID = visitor.visitorID';
  db.query(sqlGet, id, (error, result) => {
    if (!error) {
      if (result.length > 0) {
        const jsonRes = JSON.parse(JSON.stringify(result));
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(jsonRes);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader(
          'Content-Disposition',
          'attachment; filename=assessment_presentation' + id + '.csv'
        );
        return res.status(200).end(csv);
      } else {
        return res.status(401).json({
          error: true,
          message: 'No assessment record found for this presentation',
        });
      }
    } else {
      console.log(error);
      return res.status(500).send(); //when query is not successsful
    }
  });
});

router.get('/registration/export/:id', (req, res) => {
  const { id } = req.params;
  if (parseInt(id) <= 0) {
    return res.status(400).json({
      error: true,
      message: 'Please select valid presentation',
    });
  }

  const sqlGet =
    'SELECT registration.*,' +
    ' visitor.firstName, visitor.lastName, visitor.email, visitor.affiliation, visitor.category, visitor.orgName' +
    ' FROM registration, visitor' +
    ' WHERE registration.presentationID = ? AND registration.visitorID = visitor.visitorID';
  db.query(sqlGet, id, (error, result) => {
    if (!error) {
      if (result.length > 0) {
        const jsonRes = JSON.parse(JSON.stringify(result));
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(jsonRes);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader(
          'Content-Disposition',
          'attachment; filename=registration_presentation' + id + '.csv'
        );
        return res.status(200).end(csv);
      } else {
        return res.status(401).json({
          error: true,
          message: 'No registration record found for this presentation',
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
