'use strict';
// Load socket.io module & create new instance
const io = require('socket.io')();

const socketApi = {};
const debugPrefix = 'SocketAPI: ';
const elementNotFound = -1;
const Chat = require('./models/Chat');
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

    // Show last 5 messages of chat history in default room one time, or 
    // every time user refreshes page
    Chat.count({}, function(err, result){
        console.log('# of chat docs:' + result);
    });


    Chat.find({}).sort({date: -1}). limit(5).exec(function(err, historyChatMsg){
        console.log('History:' + historyChatMsg);
        io.emit('sendChatHistory', historyChatMsg);
    });

    socket.on('chat message', (data) => {
        console.log('Chat Message Event: ' + data.message);
        console.log('Chat Message Event: ' + data.image);

        const chat = new Chat({
            name:data.name,
            message:data.message,
            date: Date.now(),
            image: data.image,
        });

        console.log('Chat DB: ' + chat);

        chat.save((err, chat) => {
            if (err){
                console.log('unable to save chat message');
                throw err;
            }
        });
        
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
