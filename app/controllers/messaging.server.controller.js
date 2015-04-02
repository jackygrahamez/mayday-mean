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

          //res.json(messaging);
          nexmo.initialize('c3c7616d','e9534e8b','http',true);

          console.log(status);
          console.dir(req.body);
          if (typeof(req.body.message) != 'undefined' &&
              typeof(req.body.contacts) != 'undefined') {
            for (var i = 0; i < req.body.contacts.length; i++) {
              message = req.body.message + ' ';
              recipient = req.body.contacts[i];
              if (recipient.substring(0, 1) != "1") {
                recipient = "1"+recipient;
              }
              console.log(message);
              console.log(recipient);
              if (message.length > 0 && recipient.length > 1) {
                //helper.sendMessage(message, tel);

                nexmo.sendTextMessage(sender,recipient,message,opts,
                  function (err,messageResponse) {
                     if (err) {
                          console.log(err);
                          status = { sent : 'false', error : err };
                          res.json(status);
                     } else {
                          console.dir(messageResponse);
                          status = { sent : 'true'};
                          res.json(status);
                          //helper.sendMessage(message, tel);
                          console.log('messaging');
                          console.dir(messaging);
                          messaging._doc.messageResponse = messageResponse;
                          console.dir(messaging);
                          messaging.save(function(err) {
                            if (err) {
                              status = { sent : 'false', error : err };
                              //res.json(status);
                              console.log(status);
                              /*
                              return res.status(400).send({
                                message: errorHandler.getErrorMessage(err)
                              });*/
                            }
                        });
                     }
                  });
              }
              message = '';
              recipient = '';
            }
          }

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
