/*

http://ffmpeg.gusari.org/viewtopic.php?f=11&t=769

*/	
var DrawText = require("./lib/DrawText");
var DrawLogo = require("./lib/DrawLogo");
var Encode = require("./lib/Encode");
var TimeWindows = require("./lib/TimeWindows");
var Config = require("./config");
var TimeUtils = require("./lib/TimeUtils");

var _getDevFilename = function() {
	var d = new Date();
	return "_"+d.getMinutes()+"_"+d.getSeconds()+".mp4";
};

var _getSpeedTimerCommand = function(timerStartsAt, duration, input, output) {

	var timeWindows = new TimeWindows(timerStartsAt, duration);

	var logo = new DrawLogo("./logo.png").atTimeWindow(timeWindows.logo());

	var dt1 = new DrawText()
	.setTextStatic(TimeUtils.formatTime(Config.WARM_UP_DURATION, true)) // TODO : needs to be formatted with leading 0s
	.atTimeWindow(timeWindows.logoToWarmUp())
	.fontFormat(Config.FONT_SIZE,Config.FONT_BLUE)
	.fontFile(Config.FONT_PATH);

	var dt2 = new DrawText()
	.countdown(timeWindows.warmUp()[0],Config.WARM_UP_DURATION)
	.atTimeWindow(timeWindows.warmUp())
	.fontFormat(Config.FONT_SIZE,Config.FONT_BLUE)
	.fontFile(Config.FONT_PATH);

	var dt4 = new DrawText()
	.setTextTimeOffset(timeWindows.competition()[0])
	.atTimeWindow(timeWindows.competition())
	.fontFormat(Config.FONT_SIZE,Config.FONT_RED)
	.fontFile(Config.FONT_PATH);


	var dt3 = new DrawText()
	.setTextStatic(TimeUtils.formatTime(duration/1000)) // TODO : needs to be formatted with leading 0s
	.atTimeWindow(timeWindows.postCompetition())
	.fontFormat(Config.FONT_SIZE,Config.FONT_RED)
	.fontFile(Config.FONT_PATH);

	var encode = new Encode(input, output, logo);
	encode.addTextFilter(dt1.get());
	encode.addTextFilter(dt2.get());
	encode.addTextFilter(dt3.get());
	encode.addTextFilter(dt4.get());

	return encode.get();
}

var _getCountdownTimerCommand = function(timerStartsAt, duration, input, output) {
	if(duration%10 === 0) {		
		duration += 500
	}
	var timeWindows = new TimeWindows(timerStartsAt, duration);

	var logo = new DrawLogo("./logo.png").atTimeWindow(timeWindows.logo());

	var dt1 = new DrawText()
	.setTextStatic(TimeUtils.formatTime(Config.WARM_UP_DURATION, true)) // TODO : needs to be formatted with leading 0s
	.atTimeWindow(timeWindows.logoToWarmUp())
	.fontFormat(Config.FONT_SIZE,Config.FONT_BLUE)
	.fontFile(Config.FONT_PATH);

	var dt2 = new DrawText()
	.countdown(timeWindows.warmUp()[0],Config.WARM_UP_DURATION)
	.atTimeWindow(timeWindows.warmUp())
	.fontFormat(Config.FONT_SIZE,Config.FONT_BLUE)
	.fontFile(Config.FONT_PATH);

	var dt4 = new DrawText()
	.countdown(timeWindows.competition()[0],duration/1000)
	.atTimeWindow(timeWindows.competition())
	.fontFormat(Config.FONT_SIZE,Config.FONT_RED)
	.fontFile(Config.FONT_PATH);

	var dt3 = new DrawText()
	.setTextStatic(TimeUtils.formatTime(0, true)) // TODO : needs to be formatted with leading 0s
	.atTimeWindow(timeWindows.postCompetition())
	.fontFormat(Config.FONT_SIZE,Config.FONT_RED)
	.fontFile(Config.FONT_PATH);

	var encode = new Encode(input, output, logo);
	encode.addTextFilter(dt1.get());
	encode.addTextFilter(dt2.get());
	encode.addTextFilter(dt3.get());
	encode.addTextFilter(dt4.get());

	return encode.get();
};

var input = "./input/GOAT.MOV";
var output = "./output/"+_getDevFilename();

console.log(_getCountdownTimerCommand(2000,6000, input, output));
