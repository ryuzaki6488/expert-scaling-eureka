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

timer.initializeCountdown();

io.sockets.on('connection', function(socket) {
	setInterval(function(){
		var timeLeft = timer.getEndTime();
		if(timeLeft > 0){
      console.log("Connected Clients: "+io.engine.clientsCount.toString());
      console.log("Emitting timeLeft to all connected clients: " + timeLeft.toString());
    	io.sockets.emit('currentEndTime', {timeLeft: timeLeft});
    } else {	    	
			coinLink = "http://bittrex.com/Market/Index?MarketName=BTC-SC"
      
      //delaying the emit event to make room for the update.
      console.log("Emitting coin to all connected clients: " + coinLink);
      sleep.msleep(250);
  		io.sockets.emit('selectedCoin', {coinLink: coinLink});

  		//wait 15 seconds before resetting the counter.
  		sleep.sleep(3);
  		console.log("Re-initializign Countdown ...");
      timer.initializeCountdown();
      console.log("Emitting counter reset request for all clients.");
  		io.sockets.emit('resetTimer', {coinLink: "Lol"});
	    }
	}, 1000);
});

