'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    request = require('request'),
    config = require('../../config/config'),
    interval = 1000 * 10,
    c = 0;
var auth_token = config.zeropush.serverToken;
var options = {
  uri: 'https://api.zeropush.com/broadcast',
  headers: {
    'Content-Type': 'application/json',
    'Host': 'api.zeropush.com',
    'Accept': 'application/json',
    'Authorization': 'Token token="dev_PUxTXrErzGzhmsXCcxGr"'
  },
  body: {
    "info": {},
    "content-avaialable": 1
  },
  json: true
  /*
  POST /notify HTTP/1.1
  Host: https://api.zeropush.com
  Accept: application/json
  Content-Type: application/json
  Authorization: Token token="dev_PUxTXrErzGzhmsXCcxGr"
  */
};
//options = JSON.stringify(options);

/*
var ZeroPush = require("nzero-push"),
    zeroPush = new ZeroPush(config.zeropush.serverToken),
    notification = {
      "alert": "",
      "content_available": 1
    };
*/

function sendPush() {

  console.dir(options);
  request.post(options, function(error, response, body) {
    console.log('error');
    console.dir(error);
    console.log('response');
    console.dir(response);
    console.log('body');
    console.dir(body);
  });

  /*
  zeroPush.broadcast(notification, function (err, response) {
    if (err)
      return console.error(err);

    console.log(response);
  });
  */
}

exports.init = function () {
  // Interval Setup
  sendPush();
  setInterval(function(){
    console.log('count '+c);
    sendPush();
  	c++;
  }, interval);
};
