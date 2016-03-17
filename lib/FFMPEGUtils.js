module.exports = {
	createEnable : function(start, stop) {		
		if(start instanceof Array) {			
			stop = start[1];
			start = start[0];
		}
		return "enable='if(gte(t,"+start+"),lt(t,"+stop+"))'";
	}
}