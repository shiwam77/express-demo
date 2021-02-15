const factory = require('./handleFactory');
const Subject = require('../Models/subjectModel');
const Student = require('../Models/studentModel');

exports.getAllStudent = factory.getAllStudents(Student);
exports.getStudent = factory.getOne(Student);
exports.createStudent = factory.createOne(Student);
exports.updateStudent = factory.updateOne(Student);
exports.deleteStudent = factory.deleteOne(Student);
