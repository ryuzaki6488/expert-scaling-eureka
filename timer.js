;(function(exports) {

	function Timer() {
	}

	Timer.prototype = {

		initializeCountdown: function() {
			this.endTime = new Date().getTime() + 12000; //12 hours.
		},
		getEndTime: function() {
			var timeLeft = this.endTime - new Date().getTime();
			return timeLeft;
		}
	};

	exports.Timer = Timer;

})(typeof exports === 'undefined' ? this : exports);