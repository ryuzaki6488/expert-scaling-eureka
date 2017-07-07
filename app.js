var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	app = express(),
	server = http.createServer(app),
	io = require('socket.io').listen(server),
	Timer = require('./timer.js').Timer,
	timer = new Timer();
//var favicon = require('serve-favicon');
var morgan = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var serveStatic = require('serve-static');
var errorhandler = require('errorhandler');
var sleep = require('sleep')

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(favicon());
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('itsabigsecret'));
app.use(session());
//app.use(app.router);
app.use(serveStatic(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}	

app.get('/', routes.index);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var counterIsBeingReset = 0;
var counterPollTime = 1000; //Time (in ms) interval in which server emits counter time to connected clients
var countdownTime = 120000; //Countdown Time in ms
var counterPauseDurationOnReset = 30000; //Pause the counter for this time, after revealing the link
var connectedUsersPollTime = 3000; //Time in ms to wait before emitting connected user count to all connected clients

timer.initializeCountdown(countdownTime);
timer.setSelectedCoin();

io.sockets.on('connection', function(socket) {

  setInterval(function(){
		var timeLeft = timer.getEndTime();
		if(timeLeft > 0 && !counterIsBeingReset){
      console.log("Emitting timeLeft to all connected clients: " + timeLeft.toString());
    	io.sockets.emit('currentEndTime', {timeLeft: timeLeft});
    }else{	    	
			coinLink = "http://bittrex.com/Market/Index?MarketName=BTC-" + timer.getSelectedCoin();
      
      //delaying the emit event to make room for the update.
      console.log("Emitting coin to all connected clients: " + coinLink);
      sleep.msleep(250);
  		io.sockets.emit('selectedCoin', {coinLink: coinLink});
	   }
	}, counterPollTime);

  setInterval(function(){
    var timeLeft = timer.getEndTime();
    if(timeLeft <= 0 && !counterIsBeingReset){
      counterIsBeingReset = 1;
      setTimeout(function(){
        console.log("Re-initializing Countdown ...");
        timer.initializeCountdown(countdownTime);
        timer.setSelectedCoin();
        console.log("Emitting counter reset request for all clients.");
        io.sockets.emit('resetTimer', {coinLink: "Lol"});
        counterIsBeingReset = 0;
      }, counterPauseDurationOnReset);
    }
  },200);

  setInterval(function(){
    io.sockets.emit('connectedUsersCount', {connectedUsersCount: io.engine.clientsCount});
    console.log("Number of Connected Clients: "+io.engine.clientsCount.toString());
  }, connectedUsersPollTime);

});

