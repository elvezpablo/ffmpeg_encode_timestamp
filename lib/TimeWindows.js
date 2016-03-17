
// fraction of a second to show starting warm up time
// otherwise it goes from logo to 9 instead of 10
var Config = require("./../config");

var TimeWindows = function(startsAt, duration) {
	this._startsAt = startsAt/1000;
	this._duration = duration/1000;
}

TimeWindows.prototype.logo = function() {
	var end = (this._startsAt-Config.LOGO_TO_WARM_UP);
	end = Math.max(0,end);
	return [0,end];
}

TimeWindows.prototype.logoToWarmUp  = function() {
	var start = (this._startsAt-Config.LOGO_TO_WARM_UP);
	start = Math.max(0,start);
	return [start,this._startsAt];	
}

TimeWindows.prototype.warmUp  = function() {	
	this._competitionStart = this._startsAt+Config.WARM_UP_DURATION;
	return [this._startsAt, this._competitionStart];	
}

TimeWindows.prototype.competition  = function() {	
	this._competitionEnd = this._competitionStart + this._duration;
	return [this._competitionStart, this._competitionEnd];	
}

TimeWindows.prototype.postCompetition  = function() {	
	return [this._competitionEnd, this._competitionEnd+Config.POST_COMPETITION];	
}


module.exports  = TimeWindows;
