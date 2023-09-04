const express = require('express');
const cors = require('cors');
const app = express();
//--------------------------------------------
const http = require("http");
const server = http.createServer(app);
//--------------------------------------------
const cookieParser = require("cookie-parser");
//--------------------------------------------
const PORT = process.env.PORT || 8888;
require("dotenv").config();
//--------------------------------------------
// built-in middleware to handle urlencoded form data
//--------------------------------------------
//app.use(cors())
app.use(express.urlencoded({ extended: false }));
// MIDDLEWARE
app.use(cookieParser());
app.use(express.json());

// Cross Origin Resource Sharing
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Enable sending cookies in cross-origin requests
  }));
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


//--------------------------------------------
// routes importing
//--------------------------------------------
const studentRoute = require('./routes/student');
const authRoute = require('./routes/auth');
const apiRoute = require('./routes/api');
const webContentRoute = require('./routes/webContent');

app.use('/auth',authRoute);
app.use('/api',apiRoute);
app.use('/web-content',webContentRoute);

server.listen(PORT,()=>{
    console.log(`Server is running on host ${PORT}`);
    
})