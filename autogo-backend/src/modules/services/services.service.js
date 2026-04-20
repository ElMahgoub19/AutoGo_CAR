// AutoGo Backend - Services Service
const prisma = require('../../config/database');
const { AppError } = require('../../middleware/errorHandler');

class ServicesService {
  async getAllServices(category) {
    const where = {};
    if (category && category !== 'الكل') {
      where.category = { name: category };
    }
    const services = await prisma.service.findMany({
      where: { isActive: true, ...where },
      include: { category: true },
      orderBy: { name: 'asc' },
    });
    return services;
  }

  async getCategories() {
    const categories = await prisma.serviceCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { services: true } } },
    });
    return categories;
  }

  async getServiceById(id) {
    const service = await prisma.service.findUnique({
      where: { id },
      include: { category: true, workshops: { include: { workshop: true } } },
    });
    if (!service) throw new AppError('الخدمة غير موجودة', 404);
    return service;
  }
}

module.exports = new ServicesService();
