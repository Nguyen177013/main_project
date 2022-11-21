// Set up Engine-------------
const express = require('express');
const app = express();
const http = require('http');
const session  = require('express-session');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 3000;
const router = require('./routers/main');
const connectMongo = require('./db/connectDB');
const path = require('path');
const cookieParser = require('cookie-parser');
const {checkUser} = require('./middleware/authorization');
const socketHandler = require('./middleware/handleSocket');
const passport = require('passport');
// mongoodb connection
    try {
        connectMongo();
        server.listen(port, () => {
            console.log('server listening on port ' + port);
        });
    }
    catch (err) {
        console.log(err);
    }
// ----------------------
// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.session());
// Set up static routers
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname,'public', 'imgs')));
// Set up views Engine
app.set('view engine', 'ejs');
// Local Router
app.get('*',checkUser);
app.get('/', (req, res) => {
    res.redirect('/figure');
});
// handle socket.io
let user ={};
io.on('connection', socket=>{
    socket.on('user_rep',(data)=>{
        io.sockets.in(data.figure).emit('user_rep',`user ${data.user} has joined`);
    })
    socket.on('user_mess',data=>{
        user[data.userSend] = socket.id;
        io.sockets.to(user[data.userGet]).emit('user_mess',`user ${data.userSend } has joined`);
    })
    socket.on('messenger',data=>{
        io.sockets.to(user[data.userGet]).emit('messenger',data);
    })
    socket.on('comments',async (data)=>{
        let comment = await socketHandler.addCommentFig(data.user,data.figure,data.title);
        io.sockets.in(data.figure).emit('comments',comment);
    })
})


// Dinamic Router
app.use('/favorate',router.favorate);
app.use('/signup', router.signin);
app.use('/figure', router.home);
app.use('/character', router.character);
app.use('/origin', router.origin);
app.use('/artist', router.artist);
app.use('/category',router.category);
app.use('/material', router.material);
app.use('/cmtFig', router.cmtFig);
app.use('/figure-wiki',router.social);
app.use('/user',router.user);
app.use('/message',router.message);
app.use('/purchage',router.purchage);
// console.log(new Date(Date.now() + 1000));
app.use('*',(req,res)=>{
    res.render('404/404');
})