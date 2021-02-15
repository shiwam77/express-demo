const factory = require('../controller/handleFactory');
const Subject = require('../Models/subjectModel');

exports.getAllSubject = factory.getAllSubjects(Subject);
exports.getSubject = factory.getOne(Subject);
exports.createSubject = factory.createOne(Subject);
exports.updateSubject = factory.updateOne(Subject);
exports.deleteSubject = factory.deleteOne(Subject);
