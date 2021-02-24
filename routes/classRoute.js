
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
.route('/:Id/getAllClasses')
.get(authController.protect,authController.restrictTo('user,superAdmin'),classController.getAllClass);

router
.route('/createClass')
 .post(authController.protect,authController.restrictTo('user,superAdmin'),classController.createClass);


 router
.route('/:Id/updateClass')
 .patch(authController.protect,authController.restrictTo('user,superAdmin'),classController.updateClass);

 router
 .route('/:Id/deleteClass')
  .delete(authController.protect,authController.restrictTo('user,superAdmin'),classController.deleteClass);

module.exports = router;

