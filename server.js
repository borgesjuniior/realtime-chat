const express = require('express');
const path = require('path');
const socketIo = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);

const formatMessages = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const io = socketIo(server);


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Bot';

//Run when client connect

io.on('connection', socket => {
  socket.on('joinRoom', ({username, room}) => {
    const user = userJoin(socket.id, username, room)

    socket.join(user.room);
    socket.emit('message', formatMessages(botName, 'Welcome to chat'))

    //Show a message when user connects, execept the user thats connecting 
    socket.broadcast.to(user.room).emit('message', formatMessages(botName, `${user.username} has joined the chat`));

    //Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })
  })

  // Listen for chat messages
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessages(user.username, msg));
  })

  //Run when user disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if(user) {
      io.to(user.room).emit('message', formatMessages(botName, `${user.username} has left`));
    }

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    })
   
  })
})


server.listen(3333, () => console.log('Server runing on port: 3333!'));