'use strict';


const Passage = require ( '../passage/passage.model').model;
const Attempt = require ( './attempt.model').model;
const config = require ( '../../config/environment');
const Controller = {};

/**
 * Creates a new attempt
 */
 Controller.create = function (req, res) {
    var attempt = {
        translation: req.body.translation,
        passage: req.params.id,
        user: req.user._id
    };

    // Attempt.createIfNotFound(attempt, function(err, result){
    //     if(err){
    //         if(err == 403){
    //             res.status(403).json("You have already attempted on this passage");
    //         }
    //         else{
    //             res.status(500).json(err);
    //         }
    //     }
    //     else{
    //         res.redirect(req.get('referer'));
    //     }
    // })
    // 
    // 
    Attempt.create(attempt, function(err, result){
        if(err){
            if(err == 403){
                res.status(403).json("You have already attempted on this passage");
            }
            else{
                res.status(500).json(err);
            }
        }
        else{
            res.redirect(req.get('referer'));
        }
    })
};

module.exports = Controller;
