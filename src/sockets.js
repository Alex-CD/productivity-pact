
var sio = require('socket.io');

var rooms = require('./rooms');
var chat = require('./chat');

module.exports = function Sockets(app, http, db, bcrypt, redis) {

    io = sio.listen(http);

    io.on('connection', function (socket) {
        socket.on('createroom', (roomName, creator, plainPassword) => {
            rooms.createRoom(db, bcrypt, socket, roomName, creator, plainPassword);
        });


        socket.on('joinRoom', (roomName, username, password) => {
            rooms.joinRoom(db, bcrypt, socket, roomName, username, password);
        });

        socket.on('disconnect', () => {
            chat.disconnect();
        });

        socket.on('message', (err) => {
            chat.message();
        });
    });
}