var app = require('express')();
var rateLimit = require('express-rate-limit');
var http = require('http').createServer(app);

const bcrypt = require('bcrypt');


const redis = require('redis');
const session = require('express-session');


const { Client } = require('pg')

const db = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

db.connect();
require('./dbUtils').initDB(db);

require('./sockets')(app, http, db, bcrypt);


const limiter = rateLimit({
  windowMs: 60 * 1000, //1 minute
  max: 100, // 100 requests per minute
  message: 'Too many requests!'
});

// Apply rate limiter to all requests
app.use(limiter);


// Routes
app.get('/', function(req, res){
  res.sendFile(__dirname + '/debug.html');
});


http.listen(3000, function(){
  console.log('Server Started\nlistening on *:3000');
});


