// Set up Engine-------------
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const figureRouter = require('./routers/home');
const url = "mongodb+srv://Figure:Nguyen150801@figure.pd5pdzw.mongodb.net/figure_data?retryWrites=true&w=majority"
const connectMongo = require('./db/connectDB')
const path = require('path');

// mongoodb connection
    connectMongo(url);
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
    res.redirect('/figure')
})
// Dinamic Router
app.use('/figure',figureRouter);
// Listen to port
app.listen(port,()=>{
    console.log('server listening on port '+ port);
})


