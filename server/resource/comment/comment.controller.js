'use strict';


const Passage = require ( '../passage/passage.model').model;
const Comment = require ( './comment.model').model;
const config = require ( '../../config/environment');
const Controller = {};

/**
 * Creates a new comment
 */
 Controller.create = function (req, res) {
    var comment = {
        text: req.body.text,
        passage: req.params.id,
        user: req.user._id
    };

    Comment.create(comment, function(err, result){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.redirect(req.get('referer'));
        }
    });
};

module.exports = Controller;
