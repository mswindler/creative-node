var express = require('express');
const fs = require('fs');
const https = require('https');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', {root: 'public'});
});

router.get('/gettvshow', function(req, res, next) {

	var result = [];

	http.get('http://api.tvmaze.com/singlesearch/'+ req.query.q, function(response) {
		response.on('data', function(d) {
			result += d;
		});
		response.on('end', function() {
			res.status(200).json(JSON.parse(result));
		})
	})
})

module.exports = router;
