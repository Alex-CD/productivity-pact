

exports.createRoom = function (db, roomName, hashedPass, creatorName, callback) {
	db.query("INSERT INTO productivitypact.rooms (room_name, password, creation_timestamp, users, messages) VALUES($1, $2, current_timestamp, $3, '{}');", [roomName, hashedPass, JSON.stringify({ user: creatorName })], callback);
};


exports.roomExists = function (db, roomName, callback) {
	db.query("SELECT COUNT(*) FROM productivitypact.rooms WHERE room_name = $1;", [roomName], (err, res) => {
		if(!err){
			callback(null, res.rows.length > 0);
		} else {
			callback(err, null);
		}
	});
}

exports.verifyPassword = function(db, crypt, roomName, password, callback){

	db.query("SELECT password FROM productivitypact.rooms WHERE room_name = $1;", [roomName], (err, res) => {
		if(!err){
			// Checking room actually exists
			if(res.rows.length > 0){

				//Checking password
				bcrypt.compare(password,  res.rows[0], (err, res)=>{
					callback(err, res);
				});
			}
			else {
				callback("Room does not exist", null)
			}
		} else {
			callback(err, null);
		}
	});
}


exports.initTables = function (dbClient) {

	// Delete rows from table
	// Initialise rooms table
	dbClient.query("CREATE TABLE IF NOT EXISTS productivitypact.rooms("
		+ "room_id SERIAL PRIMARY KEY, "
		+ "room_name CHAR(40) NOT NULL, "
		+ "password CHAR(60) NOT NULL, "
		+ "creation_timestamp TIMESTAMP, "
		+ "users JSON NOT NULL, "
		+ "messages JSON NOT NULL)", (err) => {
			console.log(err);
		});


	
};

exports.deleteTables = function(dbClient){
	dbClient.query("DROP TABLE IF EXISTS productivitypact.rooms;");
};


