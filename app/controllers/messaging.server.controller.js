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
    intervalOK = false,
    opts = null,
    callback = function consolelog (err,messageResponse) {
       if (err) {
            console.log(err);
       } else {
            console.dir(messageResponse);
       }
    };
  Message.find({idfv : req.body.idfv}, {}, {}).sort({'requestTime': -1}).limit(1).exec(function(err, post) {
    console.log('find');
    if (err) {
      console.log('err');
      console.log(err);
    } else {
      if (typeof(post) !== 'undefined' && post.length > 0) {
        if (typeof(post[0].requestTime) !== 'undefined' && post[0].requestTime) {
          console.log('requestTime');
          console.log( post[0].requestTime );
          var lastReq = new Date(post[0].requestTime),
          curReq = new Date();
          if (lastReq.valueOf() + 50000 < curReq.valueOf()) {
            intervalOK = true;
          }
        }
      } else {
        intervalOK = true;
      }
    }
    console.log("intervalOK "+intervalOK);
    if (intervalOK) {
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
                console.log('req.body.contacts '+req.body.contacts.length);

                for (var i = 0; i < req.body.contacts.length; i++) {
                  var message = req.body.message + ' ',
                  recipient = req.body.contacts[i],
                  t = (i+1) * 1000;
                  if (recipient.substring(0, 1) != "1") {
                    recipient = "1"+recipient;
                  }
                  if (message.length > 0 && recipient.length > 0) {
                    if (typeof(sender) != 'undefined' &&
                        typeof(recipient) != 'undefined' &&
                        typeof(message) != 'undefined' &&
                        typeof(opts) != 'undefined' &&
                        typeof(callback) != 'undefined') {
                          var sendMessage = function(sender,recipient,message,opts) {
                            console.log('recipient '+recipient);
                            nexmo.sendTextMessage(sender,recipient,message,opts);
                          }
                          setTimeout(sendMessage, t, [sender], [recipient], [message], [opts]);

                        }
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
    } else {
      status = { sent : 'false', error : 'wait 50 seconds' };
      res.json(status);
      console.log(status);
    }
  });

  console.log(req.body.idfv);
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
