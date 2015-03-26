'use strict';

module.exports = function(app) {
	// Routing logic
	// ...
	//app.route('/messaging')
	app.post('/messaging', function(request, response){
		
	  console.log(request.body);      // your JSON
	  response.send(request.body);    // echo the result back
	});

	/*
	app.get('/messaging', function(req, res){
  	res.send('{ status : "ok" }');
	});
	*/

};
