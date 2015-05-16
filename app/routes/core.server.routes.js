'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	var PUBLIC_KEY  = '6LfsoAYTAAAAALXOlBeMDzOjDDO0dLeURcsSEzQq',
	    PRIVATE_KEY = '6LfsoAYTAAAAAGbVTt4mqI7Cgke-2bAqjaYOblDq';


	app.route('/').get(core.index);

	app.post('/contact_support', function(req, res){
		//console.dir(req.body);
		core.contact_support(req, res);
	});
};
