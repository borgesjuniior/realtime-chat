const express = require('express');
const path = require('path');
const socketIo = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);

const formatMessages = require('./utils/messages');

const io = socketIo(server);


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'chatBot';

//Run when client connect

io.on('connection', socket => {
  socket.emit('message', formatMessages(botName, 'Welcome to chat'))

  //Show a message when user connects, execept the user thats connecting 
  socket.broadcast.emit('message', formatMessages(botName, 'A user has joined the chat '));
  
  //Run when user disconnects
  socket.on('disconnect', () => {
    io.emit('message', formatMessages(botName, 'A user has left'))
  })

  // Listen for chat messages
  socket.on('chatMessage', msg => {
    io.emit('message', msg)
  })
})


server.listen(3333, () => console.log('Server runing on port: 3333!'))