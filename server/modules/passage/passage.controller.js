'use strict';


const Passage = require ( './passage.model').model;
const config = require ( '../../config/environment');
const Controller = {};

/**
 * Get list of users
 * restriction: 'admin'
 */
 Controller.index = function (req, res) {

    Passage.findActive(function(err, passages){
        if(err){
            res.status(500)
        }
        else{
            res.render('pages/index', {
                passages: passages
            });

        }
    })
};


Controller.getCreateView = function(req, res){
    res.render('pages/create')
}


Controller.getEditView = function(req, res){
     Passage.findOne({_id: req.params.id}, function(err, passage){
        if(err){
            console.log(err)
        }
        else{
            res.render('pages/edit', {
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
            console.log(err);
        }
        else{
            res.redirect('/passages');
        }
    })
};


 Controller.update = function (req, res) {
    Passage.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result){
        if(err){
            console.log(err);
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
    Passage.findOne({_id: req.params.id}, function(err, passage){
        if(err){
            console.log(err)
        }
        else{
            console.log(passage)
            res.render('pages/show', {
                passage: passage
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

        }
        else{
            res.redirect("/passages")
        }
    });


};


module.exports = Controller;
