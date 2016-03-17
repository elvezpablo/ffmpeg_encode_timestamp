
// fraction of a second to show starting warm up time
// otherwise it goes from logo to 9 instead of 10


module.exports = {

	formatTime : function(time, withoutHours) {
		var str = "00\\:";;
		if(withoutHours) {
			str = "";
		}
		var minutes = Math.floor(time/60);
		minutes = (minutes <= 9)? "0"+minutes : minutes;
		var seconds = (time%60);
		seconds = Math.round(seconds * 1000)/1000;
		seconds = (seconds <= 9)? "0"+seconds : seconds;
		str += minutes;
		str += "\\:",
		str += seconds;		
		return str;					
	}
};
