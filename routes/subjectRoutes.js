const subjectController = require('../express-demo/controller/subjectController');

exports.subjectRoutes = function subjectRoutes() {
    app.get('/:Id/getAllSubjects',authController.protect,authController.restrictTo('user'),subjectController.getAllSubject);
    app.post('/createSubject',authController.protect,authController.restrictTo('user'),subjectController.createSubject);
    app.patch('/:Id/updateSubject',subjectController.updateSubject);
    app.delete('/:Id/deleteSubject',subjectController.deleteSubject);
}
