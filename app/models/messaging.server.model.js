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
	message: {
		type: String,
		trim: true
	},
	loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'      // create the geospatial index
	},
	requestTime: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Message', MessagingSchema);
