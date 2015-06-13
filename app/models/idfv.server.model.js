'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Idfv Schema
 */
var IdfvSchema = new Schema({
	// Idfv model fields
	// ...
	idfv: {
		type: String,
		trim: true,
	},
	requestTime: {
		type: Date,
		default: Date.now
	}		
});

mongoose.model('Idfv', IdfvSchema);
