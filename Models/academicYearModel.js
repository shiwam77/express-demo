const mongoose = require('mongoose');
const { assign } = require('nodemailer/lib/shared');
const User = require('../Models/userModel');

const yearSchema = new mongoose.Schema(
  {
    year: {
        type:Number,
        required :[true,'Please Provide a year'],
       
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: true
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a User '],
      select:false,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



module.exports = mongoose.model('yearSchema',yearSchema);