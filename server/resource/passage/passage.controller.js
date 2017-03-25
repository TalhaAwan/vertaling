'use strict';


const async = require ('async');
const moment = require('moment');
const Passage = require ( './passage.model').model;
const Attempt = require ( '../attempt/attempt.model').model;
const Comment = require ( '../comment/comment.model').model;
const config = require ( '../../config/environment');
const Controller = {};

/**
 * Get list of users
 * restriction: 'admin'
 */
 Controller.index = function (req, res) {

    console.log("here in passage")
    Passage.findActive(function(err, passages){
        if(err){
            res.status(500)
        }
        else{
            res.render('passage/index', {
                passages: passages
            });

        }
    })
};


Controller.getCreateView = function(req, res){
    res.render('passage/admin/create')
}


Controller.getEditView = function(req, res){
   Passage.findOne({_id: req.params.id}, function(err, passage){
    if(err){
        res.status(500).json(err);
    }
    else{
        res.render('passage/admin/edit', {
            passage: passage
        });
    }
})
}

/**
 * Creates a new user
 */
 Controller.create = function (req, res) {
    Passage.create(req.body, function(err, result){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.redirect('/passages');
        }
    })
};


Controller.update = function (req, res) {
    Passage.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.redirect('/passages');
        }
    })
};

/**
 * Get a single user
 */
 Controller.show = function (req, res) {
    Passage.findOne({slug: req.params.slug}, function(err, passage){
        if(err){
            res.status(500).json(err);
        }
        else{
            async.parallel({
                userAttempt: function(callback){
                    Attempt.findOne({passage: passage._id, user: req.user._id}, function(err, userAttempt){
                        if(err){
                            callback(err);
                        }
                        else{
                            callback(null, userAttempt);

                        }
                    }).populate('user')
                },
                attempts: function(callback){
                    Attempt.find({passage: passage._id}, function(err, attempts){
                        if(err){
                            callback(err);
                        }
                        else{
                            callback(null, attempts);

                        }
                    }).populate('user')
                },
                comments: function(callback){
                    Comment.find({passage: passage._id}, function(err, comments){
                        if(err){
                            callback(err);
                        }
                        else{
                            callback(null, comments);
                        }

                    }).populate('user')
                }
            }, function(err, result){
                if(err){
                    res.status(500).json(err);
                }
                else{
                    res.render('passage/show', {
                        passage: passage,
                        attempts: result.attempts,
                        comments: result.comments,
                        userAttempt: result.userAttempt,
                        moment: moment
                    })
                }

            })
        }
    })
};



/**
 * Deletes a user
 * restriction: 'admin'
 */
 Controller.destroy = function (req, res) {
    Passage.destroy(req.params.id, function(err){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.redirect("/passages")
        }
    });


};


module.exports = Controller;
