
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
.route('/:Id/getAllYears')
.get(authController.protect,authController.restrictTo('user,superAdmin'),yearController.getAllYears);

router
.route('/createYear')
 .post(authController.protect,authController.restrictTo('user,superAdmin'),yearController.createYear);


 router
.route('/:Id/updateYear')
 .patch(authController.protect,authController.restrictTo('user,superAdmin'),yearController.updateYear);

 router
 .route('/:Id/deleteYear')
  .delete(authController.protect,authController.restrictTo('user,superAdmin'),yearController.deleteYear);

module.exports = router;
