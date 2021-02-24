const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const User = require('../Models/userModel');
const Year = require('../Models/academicYearModel');
const Class = require('../Models/classModel');
const validator = require('validator');

const studentSchema = new mongoose.Schema(
  {
    firstName: {
        type:String,
        required :[true,'Please Provide a firstName'],
       
    },
    middleName: {
        type:String,
     
    },
    lastName: {
        type:String,
       
    },
    rollNo: {
        type:String,
        required :[true,'Please Provide roll no'],
       
    },
    gender: {
        type:String,
        
    },
    dateOfBirth: {
        type: Date,
      },

    address : {
        type:String,
        
    },
    contact : {
        type:String,
       
    },
    studentId: {
        type:String,
        
    },
    studentAsUserId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a User '],
    
    },
    admissionNo: {
        type:Number,
        
    },
    email: {
        type:String,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
       
      },
    fatherName: {
        type:String,
        
    },
    fatherContact: {
        type:String,
       
    },
    fatherDesignation: {
        type:String,
       
    },
    motherName: {
        type:String,
        
    },
    motherContact: {
        type:String,
      
    },
    motherDesignation: {
        type:String, 
       
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: true
    },
    classId: {
        type: mongoose.Schema.ObjectId,
      ref: 'Class',
      required: [true, 'Please provide a Class'],
      select:false,
       
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
module.exports = mongoose.model('studentSchema',studentSchema);