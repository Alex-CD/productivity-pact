

exports.createRoom = function (db, roomName, password, creatorName, callback){
    db.query("EXECUTE createroom());", values, callback(err, res));
}

exports.initDB = function (dbClient){

	// Initialise rooms table
	dbClient.query("CREATE TABLE IF NOT EXISTS productivitypact.rooms("
		+ "room_id SERIAL PRIMARY KEY, "
		+ "room_name CHAR(40) NOT NULL, "
		+ "password CHAR(60) NOT NULL, "
		+ "creation_timestamp TIMESTAMP, "
		+ "users JSON NOT NULL,"
		+ "messages JSON NOT NULL)");


	// Prepared statements 
	dbClient.query("PREPARE IF NOT EXISTS createroom(VARCHAR(40), CHAR(60), VARCHAR(20)) AS"
	+ "INSERT INTO productivitypact.rooms (room_name, password, creation_timestamp, users, messages)"
	+ "VALUES($1, $2, current_timestamp, '{users:{\"user\": \"$3\"}}', '{}')");
}