
var sio = require('socket.io');
var utils = require('./utils');
var sanitizer = require('sanitize')();

module.exports = function Sockets(app, http, db, auth){

    io = sio.listen(http);

    io.on('connection', function (socket) {

        socket.on('createroom', (err, res)=>{
            if(!err){
                console.log("Create Room!:," + roomname + "," + creator + + "," + plainPassword);
                
            } else {
                client.query();
            }
         });


        socket.on('auth', function () {
            console.log("auth");
        });

        socket.on('handshake', function (username, room, password) {
            console.log("handshake" + username + room + password);
            // If pass is correct:
            // Return chat history
            // Return Auth token
            // 
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