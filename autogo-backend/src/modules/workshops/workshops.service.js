// AutoGo Backend - Workshops Service
const prisma = require('../../config/database');
const { AppError } = require('../../middleware/errorHandler');

class WorkshopsService {
  async getAllWorkshops({ lat, lng, filter }) {
    const workshops = await prisma.workshop.findMany({
      where: { ...(filter === 'open' ? { isOpen: true } : {}) },
      include: {
        services: { include: { service: true } },
        _count: { select: { ratings: true } },
      },
      orderBy: { rating: 'desc' },
    });

    // Calculate distance if user coords provided
    if (lat && lng) {
      return workshops.map((w) => {
        const distance = this._haversine(lat, lng, Number(w.latitude), Number(w.longitude));
        return { ...w, distance: Math.round(distance * 10) / 10 };
      }).sort((a, b) => a.distance - b.distance);
    }

    return workshops;
  }

  async getWorkshopById(id) {
    const workshop = await prisma.workshop.findUnique({
      where: { id },
      include: {
        services: { include: { service: true } },
        ratings: { take: 10, orderBy: { createdAt: 'desc' }, include: { user: { select: { name: true, avatarUrl: true } } } },
      },
    });
    if (!workshop) throw new AppError('الورشة غير موجودة', 404);
    return workshop;
  }

  async getNearestWorkshop(lat, lng) {
    const workshops = await prisma.workshop.findMany({ where: { isOpen: true } });
    if (!workshops.length) throw new AppError('لا توجد ورش متاحة', 404);

    let nearest = null;
    let minDist = Infinity;
    for (const w of workshops) {
      const d = this._haversine(lat, lng, Number(w.latitude), Number(w.longitude));
      if (d < minDist) { minDist = d; nearest = w; }
    }
    return { ...nearest, distance: Math.round(minDist * 10) / 10 };
  }

  _haversine(lat1, lon1, lat2, lon2) {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
}

module.exports = new WorkshopsService();
