var Utils = require("./FFMPEGUtils");

DrawLogo = function(filePath) {
	this.path = filePath;	
	return this;
}

DrawLogo.prototype.atTimeWindow = function(start, stop) {
	this._enable = Utils.createEnable(start, stop);	
	return this;
}

DrawLogo.prototype.get = function() {
	return "overlay=(main_w-overlay_w)/2:(overlay_h-10):"+this._enable;
}

module.exports = DrawLogo;