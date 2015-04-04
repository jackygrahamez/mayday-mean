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
  if (typeof(req.body.message) != 'undefined' &&
      typeof(req.body.contacts) != 'undefined' &&
            typeof(req.body.idfv) != 'undefined' ) {
    console.log('messaging create');
    console.dir(req.body);
    var sender = '12134657644',
      idfv = '',
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

            for (var i = 0; i < req.body.contacts.length; i++) {
              idfv = req.body.idfv;
              message = req.body.message + ' ';
              recipient = req.body.contacts[i];
              if (recipient.substring(0, 1) != "1") {
                recipient = "1"+recipient;
              }
              console.log(message);
              console.log(recipient);
              if (message.length > 0 && recipient.length > 1 && idfv.length >= 36) {
                //helper.sendMessage(message, tel);

                nexmo.sendTextMessage(sender,recipient,message,opts,
                  function (err,messageResponse) {

                     if (err) {
                        req.body.err = err;
                        var messaging = new Message(req.body);
                        messaging.save(function(saveErr) {
                          if (saveErr) {
                            status = { sent : 'false', error : saveErr };
                            console.log(status);
                            res.json(status);
                          } else {
                            console.log(err);
                            status = { sent : 'false', error : err };
                            res.json(status);
                          }
                      });

                     } else {
                       req.body.messageResponse = messageResponse;
                       var messaging = new Message(req.body);
                          messaging.save(function(saveErr) {
                            if (saveErr) {
                              status = { sent : 'false', error : saveErr };
                              console.log(status);
                              res.json(status);
                            } else {
                              console.dir(messageResponse);
                              status = { sent : 'true'};
                              res.json(status);
                              console.log('messaging');
                              console.dir(messaging);
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

    });
  } else {
    req.body.err = 'incomplete message request';
    var messaging = new Message(req.body);
       messaging.save(function(saveErr) {
         if (saveErr) {
           status = { sent : 'false', error : saveErr };
           console.log(status);
           res.json(status);
         } else {
           console.dir(messaging);
           status = { sent : 'false', err : req.body.err };
           res.json(status);
           console.log(status);
         }
     });

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

exports.validateMessage = function(req, res) {

};
