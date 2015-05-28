'use strict';
var got = require('got');
var api = 'http://www.omdbapi.com/?t=';

module.exports = function (title, cb) {
	api += title +'&y=&plot=short&r=json';
	got(api, function (err, data) {
		if (err) {
			cb(err);
			return;
		}

		data = JSON.parse(data);
			if (data.Response == 'False') {
			cb({message: data.Error});
			return;
		}

		cb(null, {
			rating: data.imdbRating +' / '+ data.imdbVotes +' votes ',
			title: data.Title
		});
	});
};
