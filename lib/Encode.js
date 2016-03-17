
Encode = function(input, output, logo) {
	this._logo = logo
	this._cmd = "ffmpeg -nostdin";	
	this._input = " -i "+input;
	if(logo) {
		 this._input += " -i "+logo.path;
	} 
	this._input += " -filter_complex ";
	
	this._output = " -map 0:a  -codec:a copy "+output;
	this._filters = [];
}

Encode.prototype.addTextFilter = function(str) {
	this._filters.push(str);
}

Encode.prototype.get = function() {
	var str = this._cmd;
	str += this._input;
	str += "\"";
	str += "[0:v]"
	str += this._filters.join(",");
	str += "[text];"
	if(this._logo) {
		str += "[text][1:v]";
		str +=  this._logo.get();
		str += "[filtered]";
	}
	str += "\"";
	if(this._logo) {
		str += " -map \"[filtered]\"";
	} else {
		str += " -map \"[text]\"";
	}
	str += this._output;
	return str;	
}


module.exports = Encode;