const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const Student = require('../Models/studentModel');


exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.Id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
   console.log(doc + ".Deleted");
    res.status(204).json({
      status: 'success',
      message: "Documented is deleted"
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    console.log(req.params.Id);
    console.log(req.body);
    const doc = await Model.findByIdAndUpdate(req.params.Id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    console.log(doc + ".Updated");

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

  exports.updateUser = Model =>
  catchAsync(async (req, res, next) => {
    console.log(req.params.Id);
    console.log(req.body);
    const doc = await Model.findByIdAndUpdate(req.params.Id, req.body, {
      new: true,
      runValidators: false
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    console.log(doc + ".Updated");

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });


exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const doc = await Model.create(req.body);
    console.log(doc);
    res.status(201).json({
      status: 'success',
      data:doc
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.Id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    console.log(doc);
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.Id) {
      filter = { userId: req.params.Id};
    
    }
    
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    console.log(doc);
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc
    });
  });



  exports.getAllClasses = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.Id) {
      filter = { yearId : req.params.Id};
      
    }
    
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    console.log(doc);
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc
    });
  });

  exports.getAllSubjects = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.Id) {
      filter = { classId : req.params.Id};
     
    }
    
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    console.log(doc);
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc
    });
  });

  exports.getAllStudents = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.Id) {
      filter = { classId : req.params.Id};
     
    }
    
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    console.log(doc);
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc
    });
  });

  exports.getAllHomeTask = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    console.log( req.query.date);
    let filter = {};
    if (req.params.Id) {
      filter = { subjectId : req.params.Id, Date : req.query.date};
     
    }
   
   

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    console.log(doc);
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc
    });
  });

  exports.getAllTutor = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.Id) {
      filter = { classId : req.params.Id,Date : req.query.date};
     
    }
    
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    console.log(doc);
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc
    });
  });

  exports.getAllAttendance = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
   
    var attendance = [];
    let filter = {};
    if (req.params.Id) {
      filter = { classId : req.params.Id};
     
    }
    
    
  //   const studentFeatures = new APIFeatures(Student.find(filter), req.query)
  //   .filter()
  //   .sort()
  //   .limitFields()
  //   .paginate();

  // const Studentdoc = await studentFeatures.query;
  const Studentdoc = await Student.find(filter);
  
  for(var i = 0; i < Studentdoc.length;i++){
    let filter = {"studentId": Studentdoc[i].id,"date":req.query.date}; 
    console.log(filter);
    const features = await Model.find(filter);
    console.log(features);
     if(features.length === 0){
      var data = {"attendance":[false,false,false],"studentId":Studentdoc[i].id,"Student":Studentdoc[i]};
      attendance.push(data);
     }else{
      console.log("present");
      attendance.push(features);
     }
     //console.log(attendance);
  }
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      data: attendance
    });
  });

  exports.makeAttendance = Model =>
  catchAsync(async (req, res, next) => {
    let filter = {"studentId": req.body.studentId,"date":req.body.date}; 
    const attendanceDoc = await Model.find(filter);
    console.log(filter);
    console.log(attendanceDoc);
    // const doc = await Model.create(req.body);
    //   console.log(doc);
    //   res.status(201).json({
    //     status: 'success',
    //     data:doc
    //   });

    if(attendanceDoc.length === 0){
       console.log(".created");
      const doc = await Model.create(req.body);
      console.log(doc);
      res.status(201).json({
        status: 'success',
        data:doc
      });
    }else{
      res.status(405).json({
        status: 'fail',
        message:"Attendance already Created",
        attendanceId:attendanceDoc[0].id,
      });
    }
   
  });
