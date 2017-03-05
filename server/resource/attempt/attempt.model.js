'use strict';
/*eslint no-invalid-this:0*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema

var AttemptSchema = new Schema({
	translation: {type: String, required: true},
	score: {type: Number},
	passage: {type: Schema.Types.ObjectId, ref: 'Passage', required: true},
	user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false},
	deletedAt: {type: Date}
});


module.exports.model = mongoose.model('Attempt', AttemptSchema);
