var express = require('express');
var NetflixRoulette = require('netflix-roulette');
var unirest = require('unirest');
const fs = require('fs');
const https = require('https');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', {root: 'public'});
});

unirest.get("https://community-netflix-roulette.p.mashape.com/api.php?title=The+Boondocks&year=2005")
.header("X-Mashape-Key", "BhK16cP7pNmshN8ZYAwwS112vY5zp1fuixnjsnGtB79nicV0pA")
.header("Accept", "application/json")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});

router.get('/getcity', function(req, res, next) {
	fs.readFile(__dirname + '/cities.dat.txt',function(err, data) {
		if (err) throw err;
		var jsonresult = [];

		var cities = data.toString().split('\n');
		var searchStr = req.query.q;

		if (searchStr) var myRe = new RegExp("^");
		else var myRe = new RegExp("^");

		var myRe = new RegExp("^" + req.query.q.toLowerCase());
		for(var i = 0; i < cities.length; i++) {
			var result = cities[i].toLowerCase().search(myRe);
			if (result != -1) jsonresult.push({city:cities[i]});
		}
		res.status(200).json(jsonresult);
	});
})

router.get('/getword', function(req, res, next) {

	var result = [];

	https.get('https://owlbot.info/api/v1/dictionary/'+ req.query.w, function(response) {
		response.on('data', function(d) {
			result += d;
		});
		response.on('end', function() {
			res.status(200).json(JSON.parse(result));
		})
	})
})

module.exports = router;
