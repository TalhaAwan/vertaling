const mongoose = require('mongoose'),
      extend = require('mongoose-schema-extend');
const Schema = mongoose.Schema;

var EntitySchema = new Schema({
    entityId: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    subcategory: {
        type: String
    }
}, {collection : 'entities', discriminatorKey : '_type' });
module.exports.schema = EntitySchema;
module.exports.model = mongoose.model('newEntity', EntitySchema);