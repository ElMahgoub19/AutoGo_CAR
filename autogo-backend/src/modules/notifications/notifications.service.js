// AutoGo Backend - Notifications Service
const prisma = require('../../config/database');

class NotificationsService {
  async getUserNotifications(userId) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async markAsRead(userId, notificationId) {
    await prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { isRead: true },
    });
    return { success: true };
  }

  async markAllRead(userId) {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
    return { success: true };
  }

  async getUnreadCount(userId) {
    const count = await prisma.notification.count({
      where: { userId, isRead: false },
    });
    return { count };
  }

  // Internal: create notification (called from other services)
  static async create(userId, { title, body, type, action }) {
    return prisma.notification.create({
      data: { userId, title, body, type: type || 'reminder', action: action || null },
    });
  }
}

module.exports = new NotificationsService();
module.exports.NotificationsService = NotificationsService;
