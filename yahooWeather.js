var yahooWeather = {};
var request = require('request-promise');


var _include_headers = function(body, response, resolveWithFullResponse) {
  return {'headers': response.headers, 'data': body};
};

yahooWeather.getWeather = (zipcode) => {
	var uri = 'https://www.yahoo.com/_td/api/resource/WeatherSearch;text=' + zipcode;
	var options = {
	  method: 'GET',
	  uri: uri,
	  json: true,
	  transform: _include_headers,
	}

	return request(options)
	.then(OnFirstResponse)
	.then(queryBuilder)
	.then(ReadTemperature)
	.catch(console.log)
}

var OnFirstResponse = function (response) {
	  for (var i = 0;  i<response.data.length; i++){
	  	if(response.data[i].country == "United States")
	  		break;
	  }
	  var woeid = response.data[i].woeid;

	  return woeid;
}


var queryBuilder = function (woeid){
	var query = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition.temp%20from%20weather.forecast%20where%20woeid%20%3D%20"+woeid+"&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
	
	var options = {
	  method: 'GET',
	  uri: query,
	  json: true,
	  transform: _include_headers,
	}

	return request(options)
}

var ReadTemperature = function(response){
	var temp = response.data.query.results.channel.item.condition.temp;
	return temp;
}

module.exports = yahooWeather;