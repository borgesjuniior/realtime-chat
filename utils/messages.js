const moment = require('moment');

function formatMessages(user, message) {
  return {
    user,
    message,
    time: moment().format('h:mm a')
  }
}

module.exports = formatMessages;