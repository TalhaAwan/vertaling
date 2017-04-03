module.exports = function (dbService) {
    const mongoose = require('mongoose'),
        extend = require('mongoose-schema-extend');
    const Schema = mongoose.Schema;
    const EntitySchema = require('./testSchema').schema;
    try {
        model = dbService.getModel(modelName);

    } catch (error) {
        var MusicSchema = EntitySchema.extend({
            category: {
                type: String
            }
        });       
        model = dbService.createModel('Music', MusicSchema, {
            name: 'text'
        }, '_Music');
    }
    return model;
};