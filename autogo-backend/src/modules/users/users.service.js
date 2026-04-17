// AutoGo Backend - Users Service
const prisma = require('../../config/database');
const { AppError } = require('../../middleware/errorHandler');

class UsersService {
  async getProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        wallet: true,
      },
    });

    if (!user) throw new AppError('المستخدم غير موجود', 404);

    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      avatarUrl: user.avatarUrl,
      city: user.city,
      membershipType: user.membershipType,
      points: user.points,
      isVerified: user.isVerified,
      settings: user.settings,
      walletBalance: user.wallet?.balance || 0,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId, data) {
    // If updating email, check uniqueness
    if (data.email) {
      const existing = await prisma.user.findFirst({
        where: { email: data.email, id: { not: userId } },
      });
      if (existing) throw new AppError('البريد الإلكتروني مسجل مسبقاً', 409);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
      },
    });

    return updatedUser;
  }

  async updateAvatar(userId, avatarUrl) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { avatarUrl },
      select: { avatarUrl: true },
    });
    return user;
  }

  async updateSettings(userId, settings) {
    // Assuming settings is a JSON object
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError('المستخدم غير موجود', 404);

    const mergedSettings = { ...user.settings, ...settings };

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { settings: mergedSettings },
      select: { settings: true },
    });

    return updatedUser;
  }

  async updateFcmToken(userId, fcmToken) {
    await prisma.user.update({
      where: { id: userId },
      data: { fcmToken },
    });
    return { success: true };
  }

  async deleteAccount(userId) {
    await prisma.user.delete({
      where: { id: userId },
    });
    return { success: true };
  }
}

module.exports = new UsersService();
