'use strict';

const Router = require('express').Router;
const controller = require('./attempt.controller');
const auth = require('../../auth/auth.service');
const router = new Router();

module.exports = router;