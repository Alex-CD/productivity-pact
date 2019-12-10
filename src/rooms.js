var dbUtils = require('./dbUtils');

exports.createRoom = function (db, bcrypt, socket, roomName, creator, plainPassword) {

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
}

exports.joinRoom = function (db, bcrypt, socket, roomName, username, password) {
    dbUtils.roomExists(db, roomName, (err, res) => {
        if (!err && res) {
            dbUtils.verifyPassword(db, bcrypt, roomName, password, (err, res) => {
                if (!err && res) {
                    console.log("Room Joined");
                    // TODO: Give client auth token
                } else {
                    // "password incorrect"
                    socket.emit("badPass");
                    console.log("badpass");
                }
            });
        } else {
            // "room does not exist"
            socket.emit("badRoom");
            console.log("badRoom");
        }
    });
};