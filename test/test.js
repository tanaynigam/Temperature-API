var temperature_api = require('../../Temperature-API');
var assert = require('assert');
var sinon = require('sinon');
var expect = require('expect.js');

describe('temperature API Unit Test', function() {
	beforeEach(function() {
	});

	afterEach(function() {
	});

	describe('Test GetWeather with Valid Zipcode', function(){
		var stub = sinon.stub('request');
		stub.yield();
		temperature_api.yahooWeather.getWeather(23108);
		stub.restore();
	})

});