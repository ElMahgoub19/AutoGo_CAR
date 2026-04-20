// AutoGo Backend - Orders Routes
const { Router } = require('express');
const ordersController = require('./orders.controller');
const { authenticate } = require('../../middleware/auth');

const router = Router();
router.use(authenticate);

router.post('/tow', ordersController.createTowOrder);
router.post('/booking', ordersController.createBookingOrder);
router.get('/active', ordersController.getActiveOrders);
router.get('/history', ordersController.getOrderHistory);
router.get('/:id', ordersController.getOrderById);
router.patch('/:id/status', ordersController.updateOrderStatus);
router.patch('/:id/cancel', ordersController.cancelOrder);
router.post('/:id/rate', ordersController.rateOrder);

module.exports = router;
