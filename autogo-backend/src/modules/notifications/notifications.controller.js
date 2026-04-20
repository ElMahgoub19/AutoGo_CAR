// AutoGo Backend - Notifications Controller
const notificationsService = require('./notifications.service');
const { success } = require('../../utils/response');

class NotificationsController {
  async getUserNotifications(req, res, next) {
    try {
      const notifications = await notificationsService.getUserNotifications(req.user.id);
      return success(res, notifications, 'تم جلب الإشعارات');
    } catch (err) { next(err); }
  }

  async markAsRead(req, res, next) {
    try {
      await notificationsService.markAsRead(req.user.id, req.params.id);
      return success(res, null, 'تم قراءة الإشعار');
    } catch (err) { next(err); }
  }

  async markAllRead(req, res, next) {
    try {
      await notificationsService.markAllRead(req.user.id);
      return success(res, null, 'تم قراءة جميع الإشعارات');
    } catch (err) { next(err); }
  }

  async getUnreadCount(req, res, next) {
    try {
      const result = await notificationsService.getUnreadCount(req.user.id);
      return success(res, result);
    } catch (err) { next(err); }
  }
}

module.exports = new NotificationsController();
