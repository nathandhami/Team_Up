'use strict';
// Load socket.io module & create new instance
const io = require('socket.io')();

const socketApi = {};
const debugPrefix = 'SocketAPI: ';

socketApi.io = io;

// event handler
io.on('connection', (socket) => {
    console.log(debugPrefix + 'A user connected');
    socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

    socket.on('disconnect', () => {
        console.log(debugPrefix + 'A user disconnected');
    });
});

module.exports = socketApi;
