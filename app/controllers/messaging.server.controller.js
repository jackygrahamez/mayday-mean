'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    nexmo = require('./lib/nexmo'),
    Message = mongoose.model('Message'),
    Idfv = mongoose.model('Idfv'),
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
  //db.messages.find({idfv:'448F209F-55D1-4C99-9992-C4FEFA62C33B'}).sort({"requestTime":1}).limit(1).pretty()
  Idfv.findOne({idfv: req.body.idfv}, function(err, data) {
    var deltaReqOK = false;
    console.log('requestTime');
    console.dir(data);
    console.dir(data.length);
    if (data.length > 0) {
      var lastReq = new Date(data.requestTime),
          currentReq = new Date(),
          reqDelta = 0;
      reqDelta = currentReq.valueOf() - lastReq.valueOf();
      console.log('currentReq.valueOf() '+currentReq.valueOf());
      console.log('lastReq.valueOf() '+lastReq.valueOf());
      console.log('reqDelta '+reqDelta);
      if (reqDelta > 60000) {
        deltaReqOK = true;
      }
    } else {
      deltaReqOK = true;
    }
    if (deltaReqOK) {
      console.log('reqDelta > 60000')
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
                    nexmo.sendTextMessage(sender,recipient,message,opts,callback);
                    Idfv.save({idfv: req.body.idfv, requestTime: currentReq});
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
      status = { sent : 'false', error : 'Throughput Rate Exceeded' };
      res.json(status);
      console.log(status);
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
