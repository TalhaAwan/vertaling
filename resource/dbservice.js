'use strict';
(function () {
    let dbHelper = require('./DbHelper');
    module.exports = {
        createModel: function (modelName, entityDef, indexObject, collection) {
            return dbHelper.createModel(modelName, entityDef, indexObject, collection);
        }
    };
}())