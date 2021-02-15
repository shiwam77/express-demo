const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const User = require('../Models/userModel');
const Year = require('../Models/academicYearModel');

const classSchema = new mongoose.Schema(
  {
    className: {
        type:String,
        required :[true,'Please Provide a class'],
       
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: true
    },
    yearId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Year',
      required: [true, 'Please provide a User '],
      select:false,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



module.exports = mongoose.model('classSchema',classSchema);