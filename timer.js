;(function(exports) {

	function Timer() {
		var selectedCoin = "";
		var endTime;
	}

	Timer.prototype = {
		setSelectedCoin: function(){
			var btc_markets = ["ETH","XVG","ANS","LTC","RDD","XRP","FUN","EDG","DASH","SC","DGB","STRAT","XDN","NMR","SNT","PIVX","GNT","RLC","XMR","ETC","WAVES","NXT","BTS","GUP","ARK","LSK","ZEC","BAT","GBYTE","STEEM","BITB","XEM","OK","XEL","ARDR","LBC","DCT","SWT","KMD","GAME","SNGLS","CLOAK","SNRG","PTOY","DOGE","ADT","PTC","ANT","TKN","XLM","UBQ","FCT","SYS","BNT","WINGS","DCR","CRB","MCO","VIA","CFI","AGRS","QRL","NEOS","NXS","AMP","REP","TRST","FLO","XZC","OMNI","GOLOS","MONA","BAY","MUE","MAID","VTC","XMY","SIB","LMC","VOX","KORE","FTC","BLK","CPC","BURST","DYN","1ST","VRC","EXCL","HMQ","GRS","GNO","SHIFT","ION","DGD","ZEN","DOPE","IOP","DRACO","PPC","LGD","SJCX","PDC","MUSIC","RADS","BRX","EXP","BSD","SPHR","MYST","EGC","ABY","SBD","CRW","EMC","FLDC","NAV","GLD","COVAL","CLAM","XST","POT","XWC","NLG","CANN","SPR","PEPE","SEQ","LUN","START","DTB","TIME","PINK","ENRG","GAM","EMC2","GRC","SAFEX","QWARK","CLUB","NAUT","RISE","ZCL","BTCD","XAUR","EBST","DAR","GBG","DMD","MLN","8BIT","XCP","FAIR","SLS","NXC","SLR","BTA","VRM","USNBT","UNO","BYC","CURE","AUR","BLITZ","THC","APX","GCR","BLOCK","UNB","GEO","BRK","PKB","INFX","SYNX","BCY","RBY","TRIG","TKS","XBB","HKG","ERC","INCNT","QTL","IOC","VTR","XMG","SWIFT","2GIVE","XVC","EFL","TX","JWL","AEON","TRUST"];
			this.selectedCoin = btc_markets[Math.floor(Math.random()*btc_markets.length)];

		},
		initializeCountdown: function(counterTime) {
			this.endTime = new Date().getTime() + counterTime; //12 hours.
		},
		getEndTime: function() {
			var timeLeft = this.endTime - new Date().getTime();
			return timeLeft;
		},
		getSelectedCoin: function(){
			return this.selectedCoin;
		}
	};

	exports.Timer = Timer;

})(typeof exports === 'undefined' ? this : exports);