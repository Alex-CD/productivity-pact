
var sio = require('socket.io');
var utils = require('./utils');
var dbUtils = require('./dbUtils');
var sanitizer = require('sanitize')();

module.exports = function Sockets(app, http, db, bcrypt) {

    io = sio.listen(http);

    io.on('connection', function (socket) {

        socket.on('createroom', (roomname, creator, plainPassword) => {

            console.log("CreateRoom:" + roomname + "," + creator + "," + plainPassword + "\n");


            bcrypt.hash(plainPassword, 10, function (err, hash) {
                if (!err) {
                    dbUtils.createRoom(db, roomname, hash, creator, (err, res) => {
                        if (!err) {
        
                        } else {
                            console.log(err);
                        }
                    });
                } else {
                    console.log("err");
                }
            });



        });


        socket.on('auth', function () {
            console.log("auth");
        });

        socket.on('handshake', function (username, room, password) {
            console.log("handshake" + username + room + password);

        });

        socket.on('disconnect', function () {
            console.log("disconnect");
            // If connected:
            // remove from chat group
            // Notify other users of leaving
        });

        socket.on('message', function () {
            // Broadcast message
            console.log("message");
        });
    });
}