const Account = require('../models/account');
const Post = require('../models/socialMedia');
const Character = require('../models/Characters');
const cloudinary = require('./cloudinary');
const message = require('../models/message');
const moment = require("moment");
class postController{
    socketMess =(io)=>{
        // io.on('connection',socket=>{
        //     socket.on('new-user', async (roomName,name) =>{
        //         socket.join(roomName);
        //         users[socket.id] = name;
        //         const chats = await this.showChat(roomName);
        //         chats.forEach(chat=>{
        //             socket.emit('send-chat-message',  {message:chat.message, name:chat.userSend});
        //         })
        //         socket.broadcast.to(roomName).emit('user-connected',name);
        //     })
        //     socket.on('send-chat-message',(roomName,message)=>{
        //         console.log(message);
        //         socket.join(roomName);
        //         console.log({roomName,message});
        //         socket.emit('send-chat-message', {message:message, name:users[socket.id]});
        //         socket.broadcast.to(roomName).emit('chat-message', {message:message, name:users[socket.id]});
        //         chat.addChat(users[socket.id],message,roomName);
        //     })
        //     socket.on('disconnect', () =>{
        //         socket.broadcast.emit('user-disconnected',users[socket.id]);
        //         delete users[socket.id]
        //     })
        // })
        console.log(io);
    }
    async index(req,res){
        let [charData, posts] = await Promise.all([Character.find(),Post.find().populate('user').sort({_id: -1})]);
        res.render('SocialMedia/index',{characters:charData,posts:posts,moment:moment});
    }
    async message_get(req,res){  
        let users = await Account.find();
        res.render('SocialMedia/message',{users:users});
    }
    // async showChat(id){
    //     let data = await message.find({userGet:id}).limit(8);
    //     return data;
    // }
    async sendmessage_get(req,res){  
        let user = await Account.find();
        let io = req.app.get('io');
        let room = req.params.id;
        let users = {};
        io.on('connection',socket=>{
            socket.on('new-user', async (roomName,name) =>{
                socket.join(roomName);
                users[socket.id] = name;
                // const chats = await this.showChat(roomName);
                // chats.forEach(chat=>{
                //     socket.emit('send-chat-message',  {message:chat.message, name:chat.userSend});
                // })
                socket.broadcast.to(roomName).emit('user-connected',name);
            })
            socket.on('send-chat-message',(roomName,message)=>{
                socket.join(roomName);
                console.log({roomName,message,user:users[socket.id]});
                socket.emit('send-chat-message', {message:message, name:users[socket.id]});
                socket.broadcast.to(roomName).emit('chat-message', {message:message, name:users[socket.id]});
                // chat.addChat(users[socket.id],message,roomName);
            })
            socket.on('disconnect', () =>{
                socket.broadcast.emit('user-disconnected',users[socket.id]);
                delete users[socket.id]
            })
        })
        res.render('SocialMedia/messageb',{users:user,roomName:room});
    }

    async post(req,res){
        let {body,img,origin,Character} = req.body;
        let dataImg = [];
        try{
            let userId =req.data.id
            let data = {user:userId,origin:origin,character:Character,title:body};
            for(let ele of req.files){
                const result = await cloudinary.v2.uploader.upload(ele.path,{folder: `/User_Figures/${userId}`});
                dataImg.push({url:result.secure_url,id:result.public_id});
            }
            if(dataImg.length>0)
                data['images'] = dataImg;
                let result = await Post.create(data);
                res.redirect('/figure-wiki');
        }
        catch(ex){
            console.log(ex.message);
        }
    }
}
module.exports = new postController;