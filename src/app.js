var app = require('express')();
var rateLimit = require('express-rate-limit');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const redis = require('redis')
const session = require('express-session')

const limiter = rateLimit({
  windowMs: 60 * 1000, //1 minute
  max: 100 // 100 requests per minute
  message: 'Too many requests!'
});

// Apply rate limiter to all requests
app.use(limiter);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/debug.html');
});


http.listen(3000, function(){
  console.log('Server Started\nlistening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
});
