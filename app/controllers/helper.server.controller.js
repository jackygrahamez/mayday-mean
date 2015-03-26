'use strict';

/**
 * Module dependencies.
 */
 /*
var mongoose = require('mongoose'),
    _ = require('lodash'),
    http = require('http');

var https = require('https');
var http = require('http');
var querystring = require('querystring');

var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'accept': 'application/json'
};
var initialized = false;
var username = '';
var password = '';
var msgpath = {host:'rest.nexmo.com',path:'/sms/json'};
var ttsEndpoint = {host:'api.nexmo.com',path:'/tts/json'};
var ttsPromptEndpoint = {host:'api.nexmo.com',path:'/tts-prompt/json'};
var callEndpoint = {host:'rest.nexmo.com',path:'/call/json'};
var verifyEndpoint = {host:'api.nexmo.com',path:'/verify/json'};
var checkVerifyEndpoint = {host:'api.nexmo.com',path:'/verify/check/json'};
var searchVerifyEndpoint = {host:'api.nexmo.com',path:'/verify/search/json'};
var niEndpoint = {host:'rest.nexmo.com',path:'/ni/json'};
var up = {};
var useHttps = false;
var debugOn = false;

//Error message resources are maintained globally in one place for easy management
var ERROR_MESSAGES = {
    sender: 'Invalid from address',
    to: 'Invalid to address',
    msg: 'Invalid Text Message',
    countrycode: 'Invalid Country Code',
    msisdn: 'Invalid MSISDN passed',
    body: 'Invalid Body value in Binary Message',
    udh: 'Invalid udh value in Binary Message',
    title: 'Invalid title in WAP Push message',
    url: 'Invalid url in WAP Push message',
    maxDigits: 'Invalid max digits for TTS prompt',
    byeText: 'Invalid bye text for TTS prompt',
    pinCode: 'Invalid pin code for TTS confirm',
    failedText: 'Invalid failed text for TTS confirm',
    answerUrl: 'Invalid answer URL for call',
	verifyValidation:'Missing Mandatory fields (number and/or brand)',
	checkVerifyValidation:'Missing Mandatory fields (request_id and/or code)',
	searchVerifyValidation:'Missing Mandatory fields (request_id or request_ids)',
	numberInsightValidation:'Missing Mandatory fields (number and/or callback url)'
};

//Logging in one place to make it east to move to logging library like winston later.
function log(logMsg) {
    if (logMsg instanceof Error) console.log(logMsg.stack);
    if (debugOn) {
        if (typeof logMsg === 'object') {
            console.dir(logMsg);
        } else {
            console.log(logMsg);
        }
    }
}

function sendRequest(endpoint, method, callback) {
    if (!initialized) {
        throw 'nexmo not initialized, call nexmo.initialize(username, password) first before calling any nexmo API';
    }
    if (typeof method === 'function') {
        callback = method;
        method = 'GET';
    }
    if (method === 'POST')
        headers['Content-Length'] = 0; // Fix broken due ot 411 Content-Length error now sent by Nexmo API
    var options = {
        host: endpoint.host?endpoint.host:'rest.nexmo.com',
        port: 80,
        path: '',
        method: method,
        headers: headers
    };
    options.path = endpoint.path + (endpoint.path.indexOf('?')>0?'&':'?') + querystring.stringify(up);
    log(options);
    var request;
	if (true) { // set to false to verify the request without sending the actual request
	    if (useHttps) {
	        options.port = 443;
	        request = https.request(options);
	    } else {
	        request = http.request(options);
	    }
	    request.end();
	    var responseReturn = '';
	    request.on('response', function(response) {
	        response.setEncoding('utf8');
	        response.on('data', function(chunk) {
	            responseReturn += chunk;
	        });
	        response.on('end', function() {
	            log('response ended');
	            if (callback) {
	                var retJson = responseReturn;
	                var err = null;
	                try {
	                    retJson = JSON.parse(responseReturn);
	                } catch (parsererr) {
	                    // ignore parser error for now and send raw response to client
	                    log(parsererr);
	                    log('could not convert API response to JSON, above error is ignored and raw API response is returned to client');
						log('Raw Error message from API ');
						log(responseReturn);
	                    err = parsererr;
	                }
	                callback(err, retJson);
	            }
	        });
	        response.on('close', function(e) {
	            log('problem with API request detailed stacktrace below ');
	            log(e);
	            callback(e);
	        });
	    });
	    request.on('error', function(e) {
	        log('problem with API request detailed stacktrace below ');
	        log(e);
	        callback(e);
	    });
	}
}
function sendError(callback, err, returnData) {
    // Throw the error in case if there is no callback passed
    if (callback) {
        callback(err, returnData);
    } else {
        throw err;
    }
}



function sendMessage(data, callback) {
    if (!data.from) {
        sendError(callback, new Error(ERROR_MESSAGES.sender));
    } else if (!data.to) {
        sendError(callback, new Error(ERROR_MESSAGES.to));
    } else {
        var path = msgpath;
		path.path+= '?' + querystring.stringify(data);
        log('sending message from ' + data.from + ' to ' + data.to + ' with message ' + data.text);
        sendRequest(path, 'POST', function(err, apiResponse) {
            if (!err && apiResponse.status && apiResponse.messages[0].status > 0) {
                sendError(callback, new Error(apiResponse.messages[0]['error-text']), apiResponse);
            } else {
                if (callback) callback(err, apiResponse);
            }
        });
    }
}

function getEndpoint(action) {
    return {path:action};
}

exports.sendMessage = function(opts, callback) {
  sendMessage(opts, callback);
};

exports.sendTextMessage = function(sender, recipient, message, opts, callback) {
    if (!message) {
        sendError(callback, new Error(ERROR_MESSAGES.msg));
    } else {
        if (!opts) {
            opts = {};
        }
        opts['from'] = sender;
        opts['to'] = recipient;
        opts['text'] = message;
        sendMessage(opts, callback);
    }
};
*/
