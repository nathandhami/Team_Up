'use strict';
// Load socket.io module & create new instance
const io = require('socket.io')();

const socketApi = {};
const debugPrefix = 'SocketAPI: ';
const Chat = require('./models/Chat');
const xssFilters = require('xss-filters');

socketApi.io = io;

// Stores users that are connected @ default namespace
var users = [];

// event handler for each connected socket
io.on('connection', (socket) => {

  socket.on('new user', function (userData, eventData, callback) {
    {
      socket.userName = userData.name;
      socket.email = userData.email;

      users.push({ email: socket.email, name: socket.userName });

      const uniqueUsers = filterArray(users);

      socket.room = eventData.roomId;
      socket.join(socket.room);
      io.in(socket.room).emit('updateChatUsers', uniqueUsers);
    }

    // console.log('New User Event - Global socket users: ' + users);
    // Show previous messages of chat history
    Chat.find({ 'roomId': socket.room }).sort({ date: -1 }).exec(function (err, historyChatMsg) {
      socket.emit('sendChatHistory', historyChatMsg);
    });

  });

  socket.on('chat message', (data) => {
    // Overwrite the message with special characters escaped
    data.message = xssFilters.inHTMLData(data.message);

    const chat = new Chat({
      name: data.name,
      message: data.message,
      date: data.date,
      image: data.image,
      roomId: socket.room,
    });

    chat.save((err, chat) => {
      if (err) {
        console.log('unable to save chat message');
        throw err;
      }
    });

    // Emit chat message to every client in room
    io.in(socket.room).emit('chat message', data);
  });

  socket.on('disconnect', () => {
    // Break after finding user only once
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == socket.email) {
        users.splice(i, 1);
        break;
      }
    }

    const uniqueUsers = filterArray(users);

    io.in(socket.room).emit('updateChatUsers', uniqueUsers);
    socket.leave(socket.room);

    console.log('Disconnect Event - Global socket users: ' + users);
  });
});

// Filter objects by email property
function filterArray(arr) {

  const set = new Set();
  const filteredArr = arr.filter(element => {
    if (set.has(element.email)) {
      return false;
    }
    set.add(element.email);
    return true;
  });

  return filteredArr;
}



module.exports = socketApi;
