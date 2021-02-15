const factory = require('../controller/handleFactory');
const Year = require('../Models/academicYearModel');

exports.getAllYears = factory.getAll(Year);
exports.getYear = factory.getOne(Year, { path: 'reviews' });
exports.createYear = factory.createOne(Year);
exports.updateYear = factory.updateOne(Year);
exports.deleteYear = factory.deleteOne(Year);
