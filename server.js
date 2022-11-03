// Set up Engine-------------
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const path = require('path');
// ----------------------
// Set up middleware
app.use(morgan('dev'))
app.use(express.json()); 
app.use(express.urlencoded({ extended: false}));
// Set up static routers
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'views')));
// Set up views Engine
app.set('view engine', 'ejs');

// Local Router
app.get('/',(req,res)=>{
    res.render('Home/index');
})
app.get('/detail',(req,res)=>{
    res.render('Home/detail');
})
// Listen to port
app.listen(port,()=>{
    console.log('server listening on port '+ port);
})


