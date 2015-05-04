'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');




/**
* Add user's contacts
*/

exports.addcontact = function(req, res) {
	var user = req.user,
	contact = req.body;
	console.dir(contact);
	if (user) {
		User.findById(req.user.id, function(err, user) {
			if (!err && user) {
				user.contacts = (user.contacts) ? user.contacts : [];
				console.log(user.contacts.indexOf(contact));
				if (user.contacts.indexOf(contact) < 0) {
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
									}
								});
							}
						});
					} else {
						res.status(400).send({
							message: 'User is not found'
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
