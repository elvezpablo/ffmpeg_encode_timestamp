var Utils = require("./FFMPEGUtils");

var DrawText = function() {	
	this._drawtext = "drawtext=";
	this.fontFormat();
	this.box();
	return this;
}

DrawText.prototype.setTextStatic = function(text) {
	this._text = "text=\'"+text+"\'";	
	return this;
}

DrawText.prototype.setTextTimeOffset = function(timeOffset) {
	this._text = "text='%{pts\\:hms\\:-"+timeOffset+"}'";
	return this;
}

DrawText.prototype.countdown = function(timeOffset, countdown) {
	this._text = "text='%{expr_int_format\\:floor((("+(countdown)+"-"+"(t-"+timeOffset+"))/60))\\:d\\:2}\\:%{expr_int_format\\:mod("+(countdown)+"-"+"(t-"+timeOffset+")\\,60)\\:d\\:2}'";
	return this;
}

DrawText.prototype.atTimeWindow = function(start, stop) {
	this._enable = Utils.createEnable(start, stop);
	return this;
}

DrawText.prototype.fontFile = function(path) {
	this._fontFile = ["fontfile="+path+""];	
	return this;
}

DrawText.prototype.fontFormat = function(size,color) {
	// can be red or 0xFFFFFFFF
	size = size || 48;
	color = color || "0xFFFFFFFF";
	this._fontFormat = [
	"fontcolor="+color,
	"fontsize="+size
	]
	return this;
}

DrawText.prototype.box = function(background, opactiy) {
	background = background || "black";
	opactiy = opactiy || "0.7";
	this._box = [
	"box=1",
	"boxcolor="+background+"@"+opactiy,
	"boxborderw=15",	
	"x=(w-text_w)/2",
	"y=(text_h+line_h*1.5)"
	];
	return this;
}

DrawText.prototype.get = function() {
	var str = this._drawtext ;
	str += this._text + ":";
	str += this._enable + ":";
	str += this._fontFile + ":";
	str += this._fontFormat.join(":");
	str += ":";
	str += this._box.join(":");
	return str;
}

module.exports = DrawText;