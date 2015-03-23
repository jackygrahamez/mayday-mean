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
  console.dir(req.body);
  var messaging = new Message(req.body),
    status = '';
  console.log(req.body.idfv);
  Message.count({ idfv: req.body.idfv }, function(err, count) {
    if (err) {
      status = { sent : 'false', error : err };
      res.json(status);
      console.log(status);
    } else {
      console.log('Count is ' + count);
      if (count > 10) {
        status = { sent : 'false', error : 'too many text messages sent' };
        res.json(status);
        console.log(status);
      } else {
        messaging.save(function(err) {
          if (err) {
            status = { sent : 'false', error : err };
            res.json(status);
            console.log(status);
            /*
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });*/
          } else {
            //res.json(messaging);
            status = { sent : 'true'};
            res.json(status);
            console.log(status);
            
          }
        });
      }
    }

  });

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

exports.validateMessage = function(req, res) {

};
