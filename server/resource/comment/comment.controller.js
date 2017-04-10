'use strict';

const async = require('async');
const Passage = require ( '../passage/passage.model').model;
const Attempt = require ( '../attempt/attempt.model').model;
const Comment = require ( './comment.model').model;
const config = require ( '../../config/environment');
const Controller = {};

/**
 * Creates a new comment
 */
 Controller.create = function (req, res) {
    console.log("In Create")
    var comment = {
        text: req.body.text,
        user: req.user._id
    };

    req.isAttemptComment? comment.attempt = req.params.id : comment.passage = req.params.id;
    const ModelCommentedOn = req.isAttemptComment? Attempt : Passage;

    async.waterfall([
        function(callback){
            Comment.create(comment, function(err, result){
                if(err){
                    return callback(err)
                }
                else{
                    return callback(null, result._id)
                }
            });
        },
        function(commentId, callback){
            ModelCommentedOn.update(
                { _id: req.params.id }, 
                { $push: { comments: commentId } }
                ).
            exec(function(err, res){
                if(err){
                    return callback(err)
                }
                else{
                    console.log("Updated", req.params.id)
                    return callback()
                }
            });
        }
    ], function(err){
       if(err){
        console.log(err)
        res.status(500).json(err);
    }
    else{
        res.redirect(req.get('referer'));
    }  
});




};

module.exports = Controller;
