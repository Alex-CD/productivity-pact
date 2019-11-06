

var sio = require('socket.io');

module.exports = Sockets;


function Sockets(app, http) {
    
    io = sio.listen(http);

    io.on('connection', function (socket) {

        socket.on('createroom', function (roomname, password) {
            console.log("createroom");
            // Create room in database
        });

        socket.on('auth', function(){
            console.log("auth");
        });

        socket.on('handshake', function (username, room, password) {
            console.log("handshake" + username + room + password);
            // If pass is correct:
            // Return chat history
            // Return Auth token
            // 
        });

        socket.on('disconnect', function() {
            console.log("disconnect");
            // If connected:
            // remove from chat group
            // Notify other users of leaving
        });

        socket.on('message', function() {
            // Broadcast message
            console.log("message");
        });
    });
}