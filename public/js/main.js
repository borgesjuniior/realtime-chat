const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();
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
  div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">
    ${message}
  </p>`

  document.querySelector('.chat-messages').appendChild(div);
}