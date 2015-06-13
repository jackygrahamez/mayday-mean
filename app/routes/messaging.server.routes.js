'use strict';

var messaging = require('../../app/controllers/messaging.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...
	//app.route('/messaging')
	app.post('/messaging', function(req, res){
		console.dir(req);
		var status = '';
		if (typeof(req.body.debug) !== 'undefined') {
			if (req.body.debug) {
				status = { sent : 'true', debug : 'true'};
				res.json(status);
				console.log(status);
			} else {
				messaging.create(req, res);
			}
		} else {
			messaging.create(req, res);
		}

	});

	/*
	app.route('/articles')
		.get(articles.list)
		.post(users.requiresLogin, articles.create);
	app.get('/messaging', function(req, res){
  	res.send('{ status : "ok" }');
	});
	*/

};
