// AutoGo Backend - Services Routes
const { Router } = require('express');
const servicesController = require('./services.controller');
const { optionalAuth } = require('../../middleware/auth');

const router = Router();

router.get('/', optionalAuth, servicesController.getAllServices);
router.get('/categories', servicesController.getCategories);
router.get('/:id', optionalAuth, servicesController.getServiceById);

module.exports = router;
