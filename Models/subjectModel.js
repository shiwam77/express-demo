const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const User = require('../Models/userModel');
const Year = require('../Models/academicYearModel');
const Class = require("../Models/classModel");

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
        type:String,
        required :[true,'Please Provide a class'],
       
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: true
    },
    classId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Class',
      required: [true, 'Please provide a User '],
      select:false,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



module.exports = mongoose.model('subjectSchema',subjectSchema);