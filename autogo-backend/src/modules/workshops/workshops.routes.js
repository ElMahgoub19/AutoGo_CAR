// AutoGo Backend - Workshops Routes
const { Router } = require('express');
const workshopsController = require('./workshops.controller');
const { optionalAuth } = require('../../middleware/auth');

const router = Router();

router.get('/', optionalAuth, workshopsController.getAllWorkshops);
router.get('/nearest', optionalAuth, workshopsController.getNearestWorkshop);
router.get('/:id', optionalAuth, workshopsController.getWorkshopById);

module.exports = router;
