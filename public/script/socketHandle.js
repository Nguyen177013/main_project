const socket = io();
let message_input = document.getElementById('message-input');
let form = document.getElementById('send-container');
let message_body = document.querySelector('.message_body');
socket.on('user_mess',(data)=>{
    console.log(data);
}) 
socket.emit('user_mess',{userSend:userSend,userGet:userGet})
socket.on('messenger',data=>{
    if(data.userSend !== userGet)
    return;
    handleGetMessage(data)
})
form.addEventListener('submit',function(e){
    e.preventDefault();
    console.log('this is send', message_input.value);
    handleSendMessage(message_input.value);
    socket.emit('messenger',{userSend:userSend,userGet:userGet,message:message_input.value});
    message_input.value = '';
})
function handleSendMessage(message){
    let send = document.createElement('div');
    send.classList.add('user_send');
    let html = `
        <p class="send">${message}</p>
    `
    send.innerHTML = html;
    message_body.appendChild(send);
}
function handleGetMessage(data){
    let send = document.createElement('div');
    send.classList.add('user_get');
    let html = `
        <p class="get">${data.message}</p>
    `
    send.innerHTML = html;
    message_body.appendChild(send);
}