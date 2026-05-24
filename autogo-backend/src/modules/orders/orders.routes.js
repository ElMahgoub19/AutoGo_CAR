// AutoGo Backend - Orders Routes
const { Router } = require('express');
const ordersController = require('./orders.controller');
const { authenticate, optionalAuth } = require('../../middleware/auth');

const router = Router();

// POST /tow - optional auth: works with OR without token
// This way, even guests can create an SOS order and it reaches providers
router.post('/tow', optionalAuth, ordersController.createTowOrder);
router.post('/booking', optionalAuth, ordersController.createBookingOrder);

// The rest require auth
router.use(authenticate);
router.get('/active', ordersController.getActiveOrders);
router.get('/history', ordersController.getOrderHistory);
router.get('/:id', ordersController.getOrderById);
router.patch('/:id/status', ordersController.updateOrderStatus);
router.patch('/:id/cancel', ordersController.cancelOrder);
router.post('/:id/rate', ordersController.rateOrder);

module.exports = router;
