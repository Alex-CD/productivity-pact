
var sio = require('socket.io');
var utils = require('./utils');
var dbUtils = require('./dbUtils');
var sanitizer = require('sanitize')();

module.exports = function Sockets(app, http, db, bcrypt) {

    io = sio.listen(http);
    
    io.on('connection', function (socket) {
        socket.on('createroom', (roomName, creator, plainPassword) => {

            console.log("CreateRoom:" + roomName + "," + creator + "," + plainPassword + "\n");

            dbUtils.roomExists(db, roomName, (err, roomExists) => {
                if (!err && !roomExists) {
                    bcrypt.hash(plainPassword, 10, function (err, hash) {
                        if (!err) {
                            dbUtils.createRoom(db, roomName, hash, creator, (err) => {
                                if (!err) {
                                    socket.emit("createRoom", true);
                                } else {
                                    console.log(err);
                                }
                            });
                        }
                    });
                } else {
                    socket.emit("roomNameTaken");
                }
            });
        });

        socket.on('handshake', (username, room, password) => {
            console.log("handshake" + username + room + password);

            dbUtils.roomExists(db, room, (err, res) => {
                if (!err && res) {
                    dbUtils.verifyPassword(db, bcrypt, roomName, password, (err, res) => {
                        if (!err && res) {
                            // TODO: Give client auth token
                        } else {
                            // "password incorrect"
                            socket.emit("badPass");
                        }
                    });
                } else {
                    // "room does not exist"
                    socket.emit("badRoom");
                }
            });
        });

        socket.on('disconnect', (err) => {
            console.log("disconnect");
            // If connected:
            // remove from chat group
            // Notify other users of leaving
        });

        socket.on('message', (err) => {
            // Broadcast message
            console.log("message");
        });
    });
}