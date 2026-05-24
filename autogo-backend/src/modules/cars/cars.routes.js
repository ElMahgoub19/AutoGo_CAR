// AutoGo Backend - Cars Routes
const { Router } = require('express');
const carsController = require('./cars.controller');
const { authenticate, optionalAuth } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const { addCarSchema, updateCarSchema } = require('./cars.validation');

const router = Router();

// POST car with optional auth (guest fallback allowed)
router.post('/', optionalAuth, validate(addCarSchema), carsController.addCar);

// The rest require auth
router.use(authenticate);
router.get('/', carsController.getUserCars);
router.get('/:id', carsController.getCarById);
router.put('/:id', validate(updateCarSchema), carsController.updateCar);
router.delete('/:id', carsController.deleteCar);
router.patch('/:id/activate', carsController.setActiveCar);

module.exports = router;
