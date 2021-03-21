const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users'); 

// Get username and from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

//Join chatRoom
socket.emit('joinRoom', { username, room});

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outPutRoomName(room);
  outPutUsers(users);
})

socket.on('message', message => {
  console.log(message);
  outPutMessage(message);

  //scroll down every time we get a message
  chatMessages.scrollTop = chatMessages.scrollHeight;
})

chatForm.addEventListener('submit', e => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  //emit message to the server
  socket.emit('chatMessage', msg);

  //Clear input after sent a message

  e.target.msg.value = '';
  e.target.msg.focus();

})

  //Output message to DOM
function outPutMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.user} <span>${message.time}</span></p>
  <p class="text">
    ${message.message}
  </p>`

  document.querySelector('.chat-messages').appendChild(div);
}

//Add room name to DOM
function outPutRoomName(room) {
  roomName.innerHTML = room;
}