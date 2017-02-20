'use strict';
/*eslint no-invalid-this:0*/
const mongoose = require('mongoose');
const slug = require('slug');
const sanitizeHtml = require('sanitize-html');
const Schema = mongoose.Schema

var PassageSchema = new Schema({
    title: String,
    slug: {
        type: String,
        lowercase: true
    },
    statement: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deleted: {type: Boolean, default: false},
    deletedAt: {type: Date}
});


PassageSchema
.pre('save', function(next){
   this.slug = slug(this.title, {lower: true});
   this.statement = sanitizeHtml(this.statement, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
  });
   next();	
});

PassageSchema
.pre('findOneAndUpdate', function(next){
   this._update.slug = slug(this._update.title, {lower: true});
   this._update.statement = sanitizeHtml(this._update.statement, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
  });
   next();    
});




PassageSchema.statics = {
    findActive: function(callback){
        this.find({deleted: false}, function(err, passages){
            if(err){
                callback(err);
            }
            else{
             callback(null, passages)
         }
     })
    },

    destroy: function(id, callback){
        this.findOne({_id: id}, function(err, passage){
            if(err){
                callback(err);
            }
            else{
                passage.deleted = true;
                passage.deletedAt = Date.now();
                passage.save(function(err, result){
                    if(err){
                        callback(err);
                    }
                    else{
                        callback();
                    }
                })
            }
        })
    }
};



module.exports = mongoose.model('Passage', PassageSchema);
