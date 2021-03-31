
const express = require('express');
const userController = require('../controller/userController');
const yearController = require('../controller/yearController');
const classController = require('../controller/classController');
const subjectController = require('../controller/subjectController');
const studentController = require('../controller/studentController');
const authController = require('../controller/authController');

const uploadController = require("../controller/uploadFile");
const { Router } = require('express');
const router = express.Router();
 

router
.route('/auth/v1/logout')
.get(authController.logout);

router
.route('/auth/v1/signup')
 .post(authController.signup);

 router
.route('/auth/v1/student/signup')
 .post(authController.signup);

 router
 .route('/auth/v1/login')
  .post(authController.login);
 
  router
 .route('/auth/v1/forgotPassword')
  .post(authController.forgotPassword);
 
 router
.route('/auth/v1/resetPassword')
 .patch(authController.resetPassword);

 router
.route('/updateMe')
 .patch(authController.protect,authController.restrictTo('user,superAdmin'),userController.uploadUserPhoto,userController.updateMe);

 router.post("/upload", uploadController.uploadFile);
 //by admin
 router
.route('/:Id/updateUser')
 .patch(authController.protect,authController.restrictTo('user,superAdmin'),userController.updateUser);

 router
 .route('/getAllUsers')
 .get(authController.protect,authController.restrictTo('user,admin'),userController.getAllUsers);
 
 router
 .route('/:Id/deleteUser')
  .delete(authController.protect,authController.restrictTo('user,superAdmin'),userController.deleteUser);
  

  router
  .route('/info')
   .post(authController.protect,authController.restrictTo('user,superAdmin'),userController.uploadUserPhoto,userController.resizeUserPhoto,);
  

module.exports = router;








