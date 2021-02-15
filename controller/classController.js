const factory = require('../controller/handleFactory');
const Class = require('../Models/classModel');

exports.getAllClass = factory.getAllClasses(Class);
exports.getClass = factory.getOne(Class);
exports.createClass = factory.createOne(Class);
exports.updateClass = factory.updateOne(Class);
exports.deleteClass = factory.deleteOne(Class);
