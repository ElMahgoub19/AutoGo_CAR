// AutoGo Backend - Addresses Service
const prisma = require('../../config/database');
const { AppError } = require('../../middleware/errorHandler');

class AddressesService {
  async getUserAddresses(userId) {
    return prisma.address.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addAddress(userId, data) {
    if (data.isDefault) {
      await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    }
    return prisma.address.create({ data: { ...data, userId } });
  }

  async updateAddress(userId, addressId, data) {
    const addr = await prisma.address.findFirst({ where: { id: addressId, userId } });
    if (!addr) throw new AppError('العنوان غير موجود', 404);
    if (data.isDefault) {
      await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    }
    return prisma.address.update({ where: { id: addressId }, data });
  }

  async deleteAddress(userId, addressId) {
    const addr = await prisma.address.findFirst({ where: { id: addressId, userId } });
    if (!addr) throw new AppError('العنوان غير موجود', 404);
    await prisma.address.delete({ where: { id: addressId } });
    return { success: true };
  }
}

module.exports = new AddressesService();
