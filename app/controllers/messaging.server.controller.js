'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Message = mongoose.model('Message'),
    _ = require('lodash');

/**
 * Create a Messaging
 */
exports.create = function(req, res) {
  console.log('messaging create');
  var messaging = new Message(req.body),
    status = '';
  messaging.message = req.message;
  if (true) {
    if (false) {
      status = { sent : 'false', error : 'too many text messages sent' };
      res.json(status);
    } else {
      messaging.save(function(err) {
    		if (err) {
    			return res.status(400).send({
    				message: errorHandler.getErrorMessage(err)
    			});
    		} else {
    			//res.json(messaging);
          status = { sent : 'true'};
          res.json(status);
          console.log(status);
    		}
    	});
    }
  }
};

/**
 * Show the current Messaging
 */
exports.read = function(req, res) {

};

/**
 * Update a Messaging
 */
exports.update = function(req, res) {

};

/**
 * Delete an Messaging
 */
exports.delete = function(req, res) {

};

/**
 * List of Messagings
 */
exports.list = function(req, res) {

};
