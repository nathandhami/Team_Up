'use strict';
// Load socket.io module & create new instance
const io = require('socket.io')();

const socketApi = {};
const debugPrefix = 'SocketAPI: ';
const elementNotFound = -1;

socketApi.io = io;

// Stores users that are connected @ default namespace @ default room
let users = [];

// event handler for each connected socket
io.on('connection', (socket) => {
    console.log(debugPrefix + 'A user connected');

    socket.on('new user', function (userData, callback) {
        if (users.indexOf(userData.name) != elementNotFound) {
            return false;
        }
        else {
            socket.userName = userData.name;
            users.push(socket.userName);
            io.emit('updateChatUsers', users);
        }

        console.log('New event show users: ' + users);
    });

    socket.on('chat message', (data) => {
        console.log('Chat Message Event: ' + data.message);
        console.log('Chat Message Event: ' + data.image);
        
        // Emit chat message to every client in room
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log(debugPrefix + 'A user disconnected');
        users.splice(users.indexOf(socket.userName), 1);
        io.emit('updateChatUsers', users);
        console.log('Disconnect event show users: ' + users);
    });
});

module.exports = socketApi;
