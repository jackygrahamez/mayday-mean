'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

	var PUBLIC_KEY  = '6LfsoAYTAAAAALXOlBeMDzOjDDO0dLeURcsSEzQq',
	    PRIVATE_KEY = '6LfsoAYTAAAAAGbVTt4mqI7Cgke-2bAqjaYOblDq';


function checkUnique(obj, list) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].email == obj.email) {
			return false;
		}
	}
	return true;
}

function sendMessage(user, contact) {
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
	var transporter = nodemailer.createTransport(({
	    service: 'gmail',
	    auth: {
	        xoauth2: generator
	    }
	}));

	// send mail
	transporter.sendMail({
	    from: 'invite@textsosalert.com',
	    to: contact.email,
	    subject: 'Invite sent from '+user.firstName,
	    text: contact.message
	});
}

/**
* Add user's contacts
*/

exports.addcontact = function(req, res) {
	var user = req.user,
	contact = req.body;
	//console.dir(contact);
	console.log('user');
	console.dir(user.firstName);
	if (user) {
		User.findById(req.user.id, function(err, user) {
			if (!err && user) {
				user.contacts = (user.contacts) ? user.contacts : [];
				if (checkUnique(contact, user.contacts)) {
						user.contacts.push(contact);
						user.save(function(err) {
							if (err) {
								return res.status(400).send({
									message: errorHandler.getErrorMessage(err)
								});
							} else {
								req.login(user, function(err) {
									if (err) {
										console.log('error: '+err);
										res.status(400).send(err);
									} else {
										console.log("message: 'Contact added successfully'");
										res.send({
											message: 'Contact added successfully'
										});
										sendMessage(user, contact);
									}
								});
							}
						});
					}
				}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
* Delete user's contacts
*/

exports.deletecontact = function(req, res) {
	var user = req.user,
	index = req.body;
	if (user) {
		User.findById(req.user.id, function(err, user) {
			if (!err && user) {
				user.contacts.splice(index, 1);
				user.save(function(err) {
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						req.login(user, function(err) {
							if (err) {
								console.log('error: '+err);
								res.status(400).send(err);
							} else {
								console.log("message: 'Deleted contact successfully'");
								res.send({
									message: 'Deleted contact successfully'
								});
							}
						});
					}
				});
			} else {
				res.status(400).send({
					message: 'User is not found'
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};
