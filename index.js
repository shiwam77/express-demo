const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser').json();
const compression = require('compression');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
const globalErrorHandler = require('./controller/errorController');
const AppError = require('../express-demo/utils/appError');
const dotenv = require('dotenv');
dotenv.config({path: '../express-demo/config.env'});
const authController = require('../express-demo/controller/authController');
const userController = require('../express-demo/controller/userController');
const yearController = require('../express-demo/controller/yearController');
const classController = require('../express-demo/controller/classController');
const subjectController = require('../express-demo/controller/subjectController');
const studentController = require('../express-demo/controller/studentController');
const userRoute = require('../express-demo/routes/userRoutes');
const subjectRoute = require('../express-demo/routes/subjectRoutes');
const classRoute = require('../express-demo/routes/classRoute');
const studentRoute = require('../express-demo/routes/studentsRoute');
const yearRoute = require('../express-demo/routes/yearRoute');

//const subRoutes = require('../express-demo/routes/subjectRoutes');
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
    );

     mongoose.connect(DB,
      {
        useNewUrlParser : true,
        useCreateIndex : true,
        useFindAndModify:true,
        useUnifiedTopology:true
      }).then(con => {
        console.log("database connected successfull");
      });










      app.enable('trust proxy');

     // app.set('view engine', 'pug');
     // app.set('views', path.join(__dirname, 'views'));
      
      // 1) GLOBAL MIDDLEWARES
      // Implement CORS
      app.use(cors());
      // Access-Control-Allow-Origin *
      // api.natours.com, front-end natours.com
      // app.use(cors({
      //   origin: 'https://www.natours.com'
      // }))
      
      app.options('*', cors());
      // app.options('/api/v1/tours/:id', cors());
      
      // Serving static files
    //  app.use(express.static(path.join(__dirname, 'public')));
      
      // Set security HTTP headers
      app.use(helmet());
      
      // Development logging
      if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
      }
      
      // Limit requests from same API
      // const limiter = rateLimit({
      //   max: 100,
      //   windowMs: 60 * 60 * 1000,
      //   message: 'Too many requests from this IP, please try again in an hour!'
      // });
      // app.use('/api', limiter);
      
      // Stripe webhook, BEFORE body-parser, because stripe needs the body as stream
      // app.post(
      //   '/webhook-checkout',
      //   bodyParser.raw({ type: 'application/json' }),
      //   bookingController.webhookCheckout
      // );
      
      // Body parser, reading data from body into req.body
      app.use(express.json({ limit: '10kb' }));
      app.use(express.urlencoded({ extended: true, limit: '100mb' }));
      app.use(cookieParser());
      
      // Data sanitization against NoSQL query injection
      app.use(mongoSanitize());
      
      // Data sanitization against XSS
      app.use(xss());
      
      // Prevent parameter pollution
      // app.use(
      //   hpp({
      //     whitelist: [
      //       'duration',
      //       'ratingsQuantity',
      //       'ratingsAverage',
      //       'maxGroupSize',
      //       'difficulty',
      //       'price'
      //     ]
      //   })
      // );
      
      app.use(compression());
      
      // Test middleware
      app.use((req, res, next) => {
        req.requestTime = new Date().toISOString();
        // console.log(req.cookies);
        next();
      });
      


      app.get('/',(req, res, next) => {
        res.status(200).send("hello world");
      });


      app.use(userRoute);
      app.use(subjectRoute);
      app.use(classRoute);
      app.use(studentRoute);
      app.use(yearRoute);
      


/////////////////////////User route //////////////////////////// 
app.post('/auth/v1/signup', authController.signup);
app.post('/auth/v1/login',authController.login);
app.get('/auth/v1/logout', authController.logout);

app.post('/auth/v1/forgotPassword', authController.forgotPassword);
app.patch('/auth/v1/resetPassword',authController.resetPassword);

//by admin
app.patch('/auth/v1/updateUser',userController.updateUser);

app.delete('/auth/v1/deleteUser',authController.protect,authController.restrictTo('user,superAdmin'),userController.deleteUser);
///////////////
app.get('/getAllUsers',authController.protect,authController.restrictTo('user'),userController.getAllUsers);


app.all('*',(req,res,next) => {
 
next(new AppError(`can't find ${req.originalUrl} on this server!`,404));

});

app.use(globalErrorHandler);
app.use(authController.protect);

const port = process.env.PORT || 3000 ;
app.listen(port,()=> console.log('Listening on port ' + port));