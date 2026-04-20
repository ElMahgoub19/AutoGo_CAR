// AutoGo Backend - Addresses Routes
const { Router } = require('express');
const addressesController = require('./addresses.controller');
const { authenticate } = require('../../middleware/auth');

const router = Router();
router.use(authenticate);

router.get('/', addressesController.getUserAddresses);
router.post('/', addressesController.addAddress);
router.put('/:id', addressesController.updateAddress);
router.delete('/:id', addressesController.deleteAddress);

module.exports = router;
