// const express = require('express');
// const mongoose = require('mongoose');
// const Product = require('../express-demo/Model/classs')
// const app = express();
// const dotenv = require('dotenv');

// dotenv.config({path: '../express-demo/config.env'});

// const DB = process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
//     );

//     mongoose.connect(DB,{
//         useNewUrlParser : true,
//         useCreateIndex : true,
//         useFindAndModify:true,
//         useUnifiedTopology:true
//     }).then(con => {
//         console.log(con.connection);
//         console.log("database connected successfull");
//       });;

//       const port = process.env.PORT || 3000 ;
//       app.listen(port,()=> console.log('Listening on port ' + port));