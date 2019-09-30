const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
//const router = express.Router();
const myRouter = require('./router.js');
const mongoose = require('mongoose');
var cors = require('cors');


//Db Setup
mongoose.connect('mongodb://localhost:27017/auth',{useNewUrlParser: true});

// Main starting point
//app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));
app.use(cors());

app.use('/',myRouter);


// App setup
const port = 3090;

app.listen(port,() => {
    console.log('Server is listenning on port 3090');
});
