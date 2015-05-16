'use strict';


//var smtpTransport = nodemailer.createTransport(config.mailer.options);
var nodemailer = require('nodemailer');
var generator = require('xoauth2').createXOAuth2Generator({
		user: 'john.g.shultz',
		clientId: '475852206826-1atqqohgpbrt9svvsf70uqeu9q14hdch.apps.googleusercontent.com',
		clientSecret: 'yJ1PddSyVe5wkkVkJUDN7ahi',
		refreshToken: '1/JgL-KNyr7j4jfRYrheZIl3fzR3hfbkBeikKCT0EDm_YMEudVrK5jSpoR30zcRFq6',
		accessToken: 'ya29.bwHszssrbVhEj3pGWa6BYiS8zGk0rdKU8_jN5bt4PoxPFTaQTgW7-F4Ml-8jrcud_mqHmNBwJdbSSA' // optional
});

// listen for token updates
// you probably want to store these to a db
generator.on('token', function(token){
		console.log('New token for %s: %s', token.user, token.accessToken);
});

// login
var smtpTransport = nodemailer.createTransport(({
		service: 'gmail',
		auth: {
				xoauth2: generator
		}
}));


function sendMessage(req, res) {
	var nodemailer = require('nodemailer');
	var generator = require('xoauth2').createXOAuth2Generator({
			user: 'support@textsosalert.com',
	    //user: 'john.g.shultz',
	    clientId: '366095965779-cs5vtbfvgsa8hj23q8cgckcekg5037q2.apps.googleusercontent.com',
	    //clientSecret: 'yJ1PddSyVe5wkkVkJUDN7ahi',
			clientSecret: 'pNj3uEX-vNuZzg9Oko4aYSsr',
	    refreshToken: '1/pkNNEBDfzm9XQCdDyxYnfC-7Bgwtwtm0rFCKdKKIY9990RDknAdJa_sgfheVM0XT',
	    accessToken: 'ya29.dQHkZx-3c3AZmzF6SnpmfycuGxgHQNDANV-9hhHDSihQ0CfwrVzWyijEKllo3oOCwDbpjWroLpYW2g' // optional
	});

	// listen for token updates
	// you probably want to store these to a db
	generator.on('token', function(token){
	    console.log('New token for %s: %s', token.user, token.accessToken);
	});

	// login
	var transporter = nodemailer.createTransport(({
	    service: 'gmail',
	    auth: {
	        xoauth2: generator
	    }
	}));

console.dir(req.body.inputEmail);
	// send mail

	transporter.sendMail({
	    from: req.body.inputEmail,
	    to: 'support@textsosalert.com',
	    subject: 'Contact form: '+req.body.inputSubject,
	    text: req.body.inputMessage
	}, function(err) {
			if (err) {
				var status = { sent : 'false', error : err };
				console.log(status);
				res.json(status);
			} else {
				console.log(err);
				var status = { sent : 'true' };
				res.json(status);
			}
	});

}


/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.contact_support = function(req, res) {
	//console.dir(req.body);
	//res.json(req);
	sendMessage(req, res);
};
