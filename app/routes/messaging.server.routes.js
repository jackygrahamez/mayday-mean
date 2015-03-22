'use strict';

var messaging = require('../../app/controllers/messaging.server.controller');

module.exports = function(app) {
	// Routing logic
	// ...
	//app.route('/messaging')
	app.post('/messaging', function(req, res) {
		var status = '';
		if (!(req.body.adId || req.body.idfv)) {
			status = { sent : 'false', error : 'incomplete request' };
			res.json(status);
		} else if (req.body.password !== '123456') {
			status = { sent : 'false', error : 'incorrect credentials' };
			res.json(status);
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
