#!/usr/bin/env node

const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');

// define API endpoints
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router;
