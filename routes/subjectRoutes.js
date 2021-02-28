
const express = require('express');
const userController = require('../controller/userController');
const yearController = require('../controller/yearController');
const classController = require('../controller/classController');
const subjectController = require('../controller/subjectController');
const studentController = require('../controller/studentController');
const authController = require('../controller/authController');
const { Router } = require('express');
const router = express.Router();
 

router
.route('/:Id/getAllSubjects')
.get(authController.protect,authController.restrictTo('user,superAdmin'),subjectController.getAllSubject);

router
.route('/createSubject')
 .post(authController.protect,authController.restrictTo('user,superAdmin'),subjectController.createSubject);


 router
.route('/:Id/updateSubject')
 .patch(authController.protect,authController.restrictTo('user,superAdmin'),subjectController.updateSubject);

 router
 .route('/:Id/deleteSubject')
  .delete(authController.protect,authController.restrictTo('user,superAdmin'),subjectController.deleteSubject);

module.exports = router;
