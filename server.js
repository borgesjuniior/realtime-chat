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
})


server.listen(3333, () => console.log('Server runinh on port: 3333!'))