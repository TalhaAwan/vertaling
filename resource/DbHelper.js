'use strict';
(function () {
    var mongoose = require('mongoose');   
    module.exports = { 
        createModel: function (modelName, schemaObject, indexObject, collection) {
            var modelSchema = new mongoose.Schema(schemaObject);
            if (indexObject) {
                modelSchema.index(indexObject);
            }
            return collection ? mongoose.model(modelName, modelSchema, collection) : mongoose.model(modelName, modelSchema);
        }
    }
}());