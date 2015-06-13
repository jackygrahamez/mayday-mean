'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    nexmo = require('./lib/nexmo'),
    Message = mongoose.model('Message'),
    _ = require('lodash');

/**
 * Create a Messaging
 */
exports.create = function(req, res) {
  console.log('messaging create');
  console.dir(req.body);
  var messaging = new Message(req.body),
    sender = '12134657644',
    message = '',
    recipient = '',
    status = '',
    opts = null,
    callback = function consolelog (err,messageResponse) {
       if (err) {
            console.log(err);
       } else {
            console.dir(messageResponse);
       }
    };
  Message.findOne({}, {}, {}, function(err, post) {
    console.log('requestTime');
    console.log( post );
  });
  console.log(req.body.idfv);
  Message.count({ idfv: req.body.idfv }, function(err, count) {
    if (err) {
      status = { sent : 'false', error : err };
      res.json(status);
      console.log(status);
    } else {
      console.log('Count is ' + count);
      console.log(req.body.receiptStr);
      if (count > 100 && !req.body.receiptStr) {
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
            nexmo.initialize('c3c7616d','e9534e8b','http',true);
            status = { sent : 'true'};
            res.json(status);
            console.log(status);
            for (var i = 0; i < req.body.contacts.length; i++) {
              message = req.body.message + ' ';
              recipient = req.body.contacts[i];
              if (recipient.substring(0, 1) != "1") {
                recipient = "1"+recipient;
              }
              console.log(message);
              console.log(recipient);
              if (message.length > 0 && recipient.length > 0) {
                //helper.sendMessage(message, tel);
                console.log('sender '+sender+'\nrecipient '+recipient+'\nmessage '+message+'\nopts ' + opts + '\ncallback '+callback);
                console.log('setTimeout');
                setTimeout(function(sender,recipient,message,opts,callback) {
                  console.log('timeout over triggering message');
                  console.log('sender '+sender+'\nrecipient '+recipient+'\nmessage '+message+'\nopts ' + opts + '\ncallback '+callback);

                  nexmo.sendTextMessage(sender,recipient,message,opts,callback);
                }, 10000);

              }
              message = '';
              recipient = '';
            }
            //helper.sendMessage(message, tel);
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
