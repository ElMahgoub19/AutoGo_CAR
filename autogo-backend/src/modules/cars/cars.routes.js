// AutoGo Backend - Cars Routes
const { Router } = require('express');
const carsController = require('./cars.controller');
const { authenticate } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const { addCarSchema, updateCarSchema } = require('./cars.validation');

const router = Router();
router.use(authenticate);

router.get('/', carsController.getUserCars);
router.get('/:id', carsController.getCarById);
router.post('/', validate(addCarSchema), carsController.addCar);
router.put('/:id', validate(updateCarSchema), carsController.updateCar);
router.delete('/:id', carsController.deleteCar);
router.patch('/:id/activate', carsController.setActiveCar);

module.exports = router;
