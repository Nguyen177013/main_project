const socket = io();
const messageContainer = document.querySelector('.message_body');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

socket.emit('new-user',roomName,name);
socket.on('send-chat-message',data=>{
    console.log(data);
    appendMessage(`${data.name}: ${data.message}`);
})
socket.on('chat-message',data=>{
    appendMessage(`${data.name}: ${data.message}`);
})
socket.on('user-connected',data=>{
    appendMessage(`${data} connected`);
})
socket.on('user-disconnected',data=>{
    // appendMessage(`${data} disconnect`);
})
messageForm.addEventListener('submit',e=>{
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-chat-message',roomName,message);
    messageInput.value = '';
})
function appendMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}