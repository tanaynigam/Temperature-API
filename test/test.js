var yahooWeather = require('../yahooWeather.js');
var request = require('request-promise');
var assert = require('assert');
var sinon = require('sinon');
var expect = require('expect.js');
var sample_response = require('./resources/sample_response.json')
var sample_response2 = require('./resources/sample_response2.json')

describe('temperature API Unit Test', function() {
	beforeEach(function() {
	});

	afterEach(function() {
	  sinon.restore();
	});

	describe('Test OnFirstResponse', function(){
		it(' should return the woeid of US cities', function() {
			expect(yahooWeather.OnFirstResponse(sample_response)).to.be.equal('12761084')
		});
	});

	describe('Test OnReadTemperature', function(){
		it(' should return the temperature from the response', function() {
			expect(yahooWeather.ReadTemperature(sample_response2)).to.be.equal('58')
		});
	});

	describe('Test QueryBuilder', function(){
		it(' should make a Request', function() {
			let requestStub = sinon.stub(request,'Request');
			yahooWeather.queryBuilder('12763191')
			assert(requestStub.called);
		});
	});
});