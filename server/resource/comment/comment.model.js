'use strict';
/*eslint no-invalid-this:0*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema

var CommentSchema = new Schema({
	text: {type: String, required: true},
	passage: {type: Schema.Types.ObjectId, ref: 'Passage'},
	attempt: {type: Schema.Types.ObjectId, ref: 'Attempt'},
	user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	deleted: {type: Boolean, default: false},
	deletedAt: {type: Date}
});

module.exports.model = mongoose.model('Comment', CommentSchema);
