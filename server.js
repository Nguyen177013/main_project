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
    socket.on('user-connected',data=>{
        user[data.user] = socket.id;
        io.sockets.emit('user-connected',data.user);
    })
    socket.on('user_rep',(data)=>{
        socket.join(data.figure);
        io.sockets.to(data.figure).emit('user_rep',`user ${data.user} has joined`);
    })
    socket.on('user_mess',data=>{
        user[data.userSend] = socket.id;
        io.sockets.to(user[data.userGet]).emit('user_mess',`user ${data.userSend } has joined`);
    })
    socket.on('messenger',data=>{
        io.sockets.to(user[data.userGet]).emit('messenger',data);
    })
    socket.on('comments',async (data)=>{
        console.log(data);
        let comment = await socketHandler.addCommentFig(data.user,data.figure,data.title);
        io.sockets.to(data.figure).emit('comments',comment);
    })
})

const cloudinary = require('./controllers/cloudinary');
const { urlencoded } = require('express');
const url = [];

// Dinamic Router
app.get('/video_api', async (req,res)=>{
    const result = [];
    let data = await cloudinary.v2.search.expression('folder:video/*').sort_by('public_id','desc').max_results(30).execute();
    data.resources.forEach(video=>result.push({url:video.url,name:video.filename}));
    res.json(result);
});
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
app.use('/payment',router.payment);
app.use('*',(req,res)=>{
    res.render('404/404');
})