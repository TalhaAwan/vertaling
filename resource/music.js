const mongoose = require('mongoose'),
      extend = require('mongoose-schema-extend');
const Schema = mongoose.Schema;

const EntitySchema = require('./entity').schema;

var MusicSchema = EntitySchema.extend({
    category: {
        type: String
    }
});

module.exports.model = mongoose.model('Music', MusicSchema);