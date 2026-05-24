// AutoGo Backend - Cars Service
const prisma = require('../../config/database');
const { AppError } = require('../../middleware/errorHandler');

class CarsService {
  async getUserCars(userId) {
    const cars = await prisma.car.findMany({
      where: { userId },
      include: { reminders: true },
      orderBy: { createdAt: 'desc' },
    });
    return cars;
  }

  async getCarById(userId, carId) {
    const car = await prisma.car.findFirst({
      where: { id: carId, userId },
      include: { reminders: true },
    });
    if (!car) throw new AppError('السيارة غير موجودة', 404);
    return car;
  }

  async addCar(userId, data) {
    // Resolve guest user
    let resolvedUserId = userId;
    if (userId === 'guest' || !userId) {
      let guestUser = await prisma.user.findFirst({ where: { phone: 'guest' } });
      if (!guestUser) {
        guestUser = await prisma.user.create({
          data: {
            name: 'عميل ضيف',
            phone: 'guest',
            isVerified: false,
            wallet: { create: { balance: 0 } },
          },
        });
      }
      resolvedUserId = guestUser.id;
    }

    // Deactivate all other cars, make new one active
    await prisma.car.updateMany({
      where: { userId: resolvedUserId },
      data: { isActive: false },
    });

    const car = await prisma.car.create({
      data: { ...data, userId: resolvedUserId, isActive: true },
    });
    return car;
  }

  async updateCar(userId, carId, data) {
    const car = await prisma.car.findFirst({ where: { id: carId, userId } });
    if (!car) throw new AppError('السيارة غير موجودة', 404);

    const updated = await prisma.car.update({
      where: { id: carId },
      data,
    });
    return updated;
  }

  async deleteCar(userId, carId) {
    const car = await prisma.car.findFirst({ where: { id: carId, userId } });
    if (!car) throw new AppError('السيارة غير موجودة', 404);

    await prisma.car.delete({ where: { id: carId } });
    return { success: true };
  }

  async setActiveCar(userId, carId) {
    const car = await prisma.car.findFirst({ where: { id: carId, userId } });
    if (!car) throw new AppError('السيارة غير موجودة', 404);

    await prisma.car.updateMany({ where: { userId }, data: { isActive: false } });
    await prisma.car.update({ where: { id: carId }, data: { isActive: true } });
    return { success: true };
  }
}

module.exports = new CarsService();
