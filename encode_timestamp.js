/*

http://ffmpeg.gusari.org/viewtopic.php?f=11&t=769
https://ffmpeg.org/ffmpeg-filters.html

*/	

var getCountdownTimerCommand = require("./getCountdownTimerCommand");
var getSpeedTimerCommand = require("./getSpeedTimerCommand");

var _getDevFilename = function() {
	var d = new Date();
	return "_"+d.getMinutes()+"_"+d.getSeconds()+".mp4";
};

var input = "./input/GOAT.MOV";
var output = "./output/"+_getDevFilename();
var logoPath = "./logo.png";
var fontPath = "./fonts/digital-7-mono.ttf";

console.log(getCountdownTimerCommand(2000,6000, input, logoPath, fontPath, "_timer_"+output));
console.log("--------");
console.log(getSpeedTimerCommand(2000,6000, input, logoPath, fontPath, "_speed_"+output));
