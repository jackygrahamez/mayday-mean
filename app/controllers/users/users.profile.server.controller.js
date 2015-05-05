'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	mandrill = require('mandrill-api/mandrill');

var mandrill_client = new mandrill.Mandrill('Q6k4Qnx2hJ-JPJ_AlCluyw');

function checkUnique(obj, list) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].email == obj.email) {
			return false;
		}
	}
	return true;
}

function sendMessage() {
	var d = new Date(),
		date = d.toUTCString(),
		message = {
	    "html": "<p>Example HTML content</p>",
	    "text": "Example text content",
	    "subject": "example subject",
	    "from_email": "message.from_email@example.com",
	    "from_name": "Example Name",
	    "to": [{
	            "email": "john.g.shultz@gmail.com",
	            "name": "Recipient Name",
	            "type": "to"
	        }],
	    "headers": {
	        "Reply-To": "message.reply@example.com"
	    },
	    "important": false,
	    "track_opens": null,
	    "track_clicks": null,
	    "auto_text": null,
	    "auto_html": null,
	    "inline_css": null,
	    "url_strip_qs": null,
	    "preserve_recipients": null,
	    "view_content_link": null,
	    "bcc_address": "message.bcc_address@example.com",
	    "tracking_domain": null,
	    "signing_domain": null,
	    "return_path_domain": null,
	    "merge": true,
	    "merge_language": "mailchimp",
	    "global_merge_vars": [{
	            "name": "merge1",
	            "content": "merge1 content"
	        }],
	    "merge_vars": [{
	            "rcpt": "recipient.email@example.com",
	            "vars": [{
	                    "name": "merge2",
	                    "content": "merge2 content"
	                }]
	        }],
	    "tags": [
	        "password-resets"
	    ],
	    "subaccount": "customer-123",
	    "google_analytics_domains": [
	        "example.com"
	    ],
	    "google_analytics_campaign": "message.from_email@example.com",
	    "metadata": {
	        "website": "www.example.com"
	    },
	    "recipient_metadata": [{
	            "rcpt": "john.g.shultz@gmail.com",
	            "values": {
	                "user_id": 123456
	            }
	        }],
	    "attachments": [{
	            "type": "text/plain",
	            "name": "myfile.txt",
	            "content": "ZXhhbXBsZSBmaWxl"
	        }],
	    "images": [{
	            "type": "image/png",
	            "name": "IMAGECID",
	            "content": "ZXhhbXBsZSBmaWxl"
	        }]
	};
	var async = false;
	var ip_pool = "Main Pool";
	var send_at = date;
	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
	    console.log(result);
	    /*
	    [{
	            "email": "recipient.email@example.com",
	            "status": "sent",
	            "reject_reason": "hard-bounce",
	            "_id": "abc123abc123abc123abc123abc123"
	        }]
	    */
	}, function(e) {
	    // Mandrill returns the error as an object with name and message keys
	    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
	});
}

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
										sendMessage();
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
