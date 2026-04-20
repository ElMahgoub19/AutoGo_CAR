// AutoGo Backend - Notifications Routes
const { Router } = require('express');
const notificationsController = require('./notifications.controller');
const { authenticate } = require('../../middleware/auth');

const router = Router();
router.use(authenticate);

router.get('/', notificationsController.getUserNotifications);
router.get('/unread-count', notificationsController.getUnreadCount);
router.patch('/:id/read', notificationsController.markAsRead);
router.patch('/read-all', notificationsController.markAllRead);

module.exports = router;
