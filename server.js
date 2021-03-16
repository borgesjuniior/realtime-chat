const express = require('express');
const path = require('path');
const socketIo = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);

const io = socketIo(server);


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname)

//Run when client connect

io.on('connection', socket => {
  console.log('New WS connection...')

  socket.emit('message', 'Welcome to chat')

  //Show a message when user connects, execept the user thats connecting 
  socket.broadcast.emit('message', 'A user has joined the chat ');
  
  //Run when user disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left')
  })

  // Listen for chat messages
  socket.on('chatMessage', msg => {
    console.log(msg);
  })
})


server.listen(3333, () => console.log('Server runing on port: 3333!'))