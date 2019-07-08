//make connection
var socket = io.connect('http://localhost:4000/');
//Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');
//emmit event
btn.addEventListener('click', function(){
    //param 1: name of message, param 2: message
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
})
//typing events
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});
//chat DOM
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});
//typing DOM
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message... </em></p>';
});
