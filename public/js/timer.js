;(function(exports) {

	function Timer() {
		this.endTime = new Date().getTime();
	}

	Timer.prototype = {
		setEndTimeFromServer: function(time) {
			this.timeLeft = time;
		},
		format: function() {
			var time = this.timeLeft,
				seconds = Math.floor((time / 1000) % 60),
				minutes = Math.floor((time / (1000 * 60)) % 60),
				hours = Math.floor((time / (1000 * 60 * 60)) % 24);

			var formattedTime = "";
			if (hours > 0 && hours < 10) {
				formattedTime += "0" + hours + ":";
			} else if (hours >= 10) {
				formattedTime += hours + ":";
			}

			if (minutes < 10) {
				formattedTime += "0" + minutes + ":";
			} else {
				formattedTime += minutes + ":";
			}

			if (seconds < 10) {
				formattedTime += "0" + seconds;
			} else {
				formattedTime += seconds;
			}

			return formattedTime;
		}
	};

	exports.Timer = Timer;

})(typeof exports === 'undefined' ? this : exports);

;(function() {

	var timer = new Timer(),
		coinLink = "",
		connectedUsersCount = 0,
		socket = io.connect('http://10.20.86.32:3000');
	
	socket.on('currentEndTime', function (data) {
		timer.setEndTimeFromServer(data.timeLeft);
		$('#coinLink').hide();
		$('#timer').show();
	});

	socket.on('selectedCoin', function (data) {
		coinLink = data.coinLink;
		console.log(coinLink);
		href = "<a href='" + coinLink + "' >" + coinLink + "</a>";
		$('#coinLink').html(href);
		$('#coinLink').show();
		$('#timer').hide();
	});

	socket.on('resetTimer', function (data) {
		coinLink = "";
		$('#coinLink').hide();
		$('#timer').show();
		$('#coinLink').html("");
	});

	socket.on('connectedUsersCount', function(data){
		connectedUsersCount = "User Count: " + data.connectedUsersCount.toString();
		$('#connectedUsers').html(connectedUsersCount);
	});

	setInterval(function() {
		if (timer.timeLeft > 0 && !coinLink) {
			$('#timer').text(timer.format());
		}
	},100);

})();