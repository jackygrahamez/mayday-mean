'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    errorHandler = require('../errors.server.controller.js'),
  	passport = require('passport'),
    User = mongoose.model('User');

/**
 * Create a Contact
 */
exports.addcontact = function(req, res) {
  if(!req.isAuthenticated()) {
    console.dir(req);
  }
};

/**
 * Show the current Contact
 */
exports.read = function(req, res) {

};

/**
 * Update a Contact
 */
exports.update = function(req, res) {

};

/**
 * Delete an Contact
 */
exports.delete = function(req, res) {

};

/**
 * List of Contacts
 */
exports.list = function(req, res) {

};
