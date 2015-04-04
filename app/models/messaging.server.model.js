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
	},
	idfv: {
		type: String,
		trim: true,
	},
	contacts: {
		type: [String],
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
	},
	messageResponse: {
		type: Schema.Types.Mixed
	},
	err: {
		type: Schema.Types.Mixed
	}
});

mongoose.model('Message', MessagingSchema);
