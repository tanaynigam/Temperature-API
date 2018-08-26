var express = require('express');
var app = express();
var yahooWeather = require('./yahooWeather.js')
var temp = 0;

app.get('/locations/:zip' , function (req, res) {
	var data = yahooWeather.getWeather(req.params.zip)
	data.then((data) => {
		var temp
		var scale
		if(req.query.scale == "Celsius"){
			scale = "Celsius"
			temp = (data - 32) * (5/9)
		}
		else if(req.query.scale == "Fahrenheit"){
			scale = "Fahrenheit"
			temp = data
		}
		else if(req.query.scale != null){
			scale = "Fahrenheit"
			temp = data
		}
		result = {"temperature" : temp, "scale" : scale}
		res.send(result)
	}).catch(error => res.send("Error") )

})



var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})