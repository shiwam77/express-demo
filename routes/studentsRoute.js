
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
.route('/:Id/getAllStudents')
.get(authController.protect,authController.restrictTo('user,superAdmin'),studentController.getAllStudent);

router
.route('/createStudent')
 .post(authController.protect,authController.restrictTo('user,superAdmin'),studentController.createStudent);


 router
.route('/:Id/updateStudent')
 .patch(authController.protect,authController.restrictTo('user,superAdmin'),studentController.updateStudent);

 router
 .route('/:Id/deleteStudent')
  .delete(authController.protect,authController.restrictTo('user,superAdmin'),studentController.deleteStudent);

module.exports = router;
