const express = require('express');
const app = express();;
const path = require('path')
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3333, () => {
  console.log('Server started on port: 3333')
})