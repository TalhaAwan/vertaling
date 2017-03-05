'use strict';

const Router = require('express').Router;
const controller = require('./attempt.controller');
// const validationSchema = require('./user.validation.schema');
// const validator = require('../../utils/request.validator.js');
const auth = require('../../auth/auth.service');

const router = new Router();

// router.get('/', auth.isAuthenticated(),  controller.index);
// router.get('/show/:id', controller.show);
// router.delete('/:id', controller.destroy);
// router.put('/:id', controller.update);
// router.get('/create', controller.getCreateView);
// router.get('/edit/:id', controller.getEditView);
// router.get('/:id', controller.show);
// router.post('/', controller.create);

module.exports = router;
