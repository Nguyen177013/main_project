// Set up Engine-------------
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routers/main');
const connectMongo = require('./db/connectDB');
const path = require('path');
// mongoodb connection
    try {
        connectMongo();
        app.listen(port, () => {
            console.log('server listening on port ' + port);
        });
    }
    catch (err) {
        console.log(err);
    }
// ----------------------
// Set up middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Set up static routers
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
// Set up views Engine
app.set('view engine', 'ejs');
// Local Router
app.get('/', (req, res) => {
    res.redirect('/figure');
});
// Dinamic Router
app.use('/signup', router.signin);
app.use('/figure', router.home);
app.use('/character', router.character);
app.use('/origin', router.origin);
app.use('/artist', router.artist);
app.use('/material', router.material);

