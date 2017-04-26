'use strict';

const async = require('async');
const moment = require('moment');
const Passage = require ( '../passage/passage.model').model;
const Attempt = require ( '../attempt/attempt.model').model;
const Comment = require ( './comment.model').model;
const config = require ( '../../config/environment');
const Controller = {};

/**
 * Creates a new comment
 */
 Controller.create = function (req, res) {
    console.log("In Create", req.body)
    var comment = {
        text: req.body.text,
        user: req.user._id
    };

    req.isAttemptComment? comment.attempt = req.params.id : comment.passage = req.params.id;
    const ModelCommentedOn = req.isAttemptComment? Attempt : Passage;

    async.waterfall([
        function(callback){
            Comment.create(comment, function(err, comment){
                if(err){
                    return callback(err)
                }
                else{
                    return callback(null, comment)
                }
            });
        },
        function(comment, callback){
            ModelCommentedOn.update(
                { _id: req.params.id }, 
                { $push: { comments: comment._id } }
                ).
            exec(function(err, res){
                if(err){
                    return callback(err)
                }
                else{
                    console.log("Updated", req.params.id)
                    return callback(null, comment)
                }
            });
        }
        ], function(err, comment){
           if(err){
            console.log(err)
            res.status(500).json(err);
        }
        else{
            console.log("comment created", comment);
            comment.user = req.user;
            // res.send({comment: comment})
            res.render('passage/component/passage/comment', {
                passage: {
                    _id: req.params.id,
                    comments: [comment]
                },
                moment: moment
            })
        }  
    });




};

module.exports = Controller;
