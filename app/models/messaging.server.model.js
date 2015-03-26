'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Messaging Schema
 */
var MessagingSchema = new Schema({
	// Messaging model fields
	// ...
	adId: {
		type: String,
		trim: true,
		default: ''
	},
	idfv: {
		type: String,
		trim: true
	},
	requestTime: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Message', MessagingSchema);
