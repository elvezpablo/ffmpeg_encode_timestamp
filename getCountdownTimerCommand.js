var DrawText = require("./lib/DrawText");
var DrawLogo = require("./lib/DrawLogo");
var Encode = require("./lib/Encode");
var TimeWindows = require("./lib/TimeWindows");
var Config = require("./config");
var TimeUtils = require("./lib/TimeUtils");


module.exports = function(timerStartsAt, duration, input, logoPath, fontPath, output) {
    if(duration%10 === 0) {
        duration += 500
    }
    var timeWindows = new TimeWindows(timerStartsAt, duration);

    var logo = new DrawLogo(logoPath).atTimeWindow(timeWindows.logo());

    var dt1 = new DrawText()
        .setTextStatic(TimeUtils.formatTime(Config.WARM_UP_DURATION, true))
        .atTimeWindow(timeWindows.logoToWarmUp())
        .fontFormat(Config.FONT_SIZE,Config.FONT_BLUE)
        .fontFile(fontPath);

    var dt2 = new DrawText()
        .countdown(timeWindows.warmUp()[0],Config.WARM_UP_DURATION)
        .atTimeWindow(timeWindows.warmUp())
        .fontFormat(Config.FONT_SIZE,Config.FONT_BLUE)
        .fontFile(fontPath);

    var dt4 = new DrawText()
        .countdown(timeWindows.competition()[0],duration/1000)
        .atTimeWindow(timeWindows.competition())
        .fontFormat(Config.FONT_SIZE,Config.FONT_RED)
        .fontFile(fontPath);

    var dt3 = new DrawText()
        .setTextStatic(TimeUtils.formatTime(0, true))
        .atTimeWindow(timeWindows.postCompetition())
        .fontFormat(Config.FONT_SIZE,Config.FONT_RED)
        .fontFile(fontPath);

    var encode = new Encode(input, output, logo);
    encode.addTextFilter(dt1.get());
    encode.addTextFilter(dt2.get());
    encode.addTextFilter(dt3.get());
    encode.addTextFilter(dt4.get());

    return encode.get();
};