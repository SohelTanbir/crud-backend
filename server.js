// dependency
const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser  =  require('body-parser');
const cors = require('cors')
const app = express();

// internal import
const { databaseConnection } = require('./database/databaseConnection.js');
const router = require('./routes/route.js');




// database connection 
databaseConnection();

//use cors
app.use(cors())
// parse application json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded;
app.use(bodyParser.urlencoded({extended:true}));

//all routes 
app.use('/', router)



// default Error Handler
const errorHandler  = (err, req, res, next)=>{
   if(req.headersSent){
    console.log(req.headersSent);
        return next(err)
   }
   res.status(500).json({error:err})
    
}


app.use(errorHandler);

app.listen(process.env.PORT || '8080', () => {
    console.log(`Server is running ${process.env.PORT || 8080}`)
})