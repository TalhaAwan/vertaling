'use strict';


const Passage = require ( '../passage.model').model;
const config = require ( '../../../config/environment');
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
            res.render('passage/admin/index', {
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
            console.log(err)
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
            console.log(err);
        }
        else{
            res.redirect('/admin/passages');
        }
    })
};


 Controller.update = function (req, res) {
    Passage.findOneAndUpdate({_id: req.params.id}, req.body, function(err, result){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/admin/passages');
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
            res.render('passage/admin/show', {
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
            res.redirect("/admin/passages")
        }
    });


};


module.exports = Controller;
