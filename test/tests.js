var expect = require("chai").expect;
var should = require("should");

describe("TimeUtils", function() {
    var TimeUtils = require("../lib/TimeUtils");

    it("Should add a zero if less than two digits", function() {
        console.log(TimeUtils.formatTime(181.5565,true))
    })

});

describe("TimeWindows", function() {

    var TimeWindows = require("../lib/TimeWindows");
    var tw;
    before(function() {
        tw = new TimeWindows(3*1000,10*1000)
    });

    it("Should show the logo up to 2.5 second mark", function() {
       tw.logo()[0].should.equal(0);       
       tw.logo()[1].should.equal(2.5);
    });

    it("Should start showing logoToWarmUp at 2.5", function() {       
       tw.logoToWarmUp()[0].should.equal(2.5);
    });

    it("Should stop showing logoToWarmUp at 3", function() {       
       tw.logoToWarmUp()[1].should.equal(3);
    });

    it("Should start showing warmUp at 3", function() {       
       tw.warmUp()[0].should.equal(3);
    });

    xit("Should stop showing warmUp at 13", function() {       
       tw.warmUp()[1].should.equal(13);
    });

    xit("Should start showing competition at 13", function() {       
       tw.competition()[0].should.equal(13);
    });

    xit("Should stop showing competition at 23", function() {       
       tw.competition()[1].should.equal(23);
    });

    xit("Should start showing postCompetition at 23", function() {       
       tw.postCompetition()[0].should.equal(23);
    });

    xit("Should stop showing postCompetition at 25", function() {       
       tw.postCompetition()[1].should.equal(25);
    });

});