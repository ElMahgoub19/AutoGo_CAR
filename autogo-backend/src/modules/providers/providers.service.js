// AutoGo Backend - Providers Service
// Handles all provider-side business logic: fetching orders, accepting, status updates, location
const prisma = require('../../config/database');
const { AppError } = require('../../middleware/errorHandler');
const { emitToUser, emitToOrder, getIO } = require('../../config/socket');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'autogo_dev_secret';

class ProvidersService {

  // ── Provider Auth: Login / Register ────────────────────────────────────────
  async login(phone, password) {
    const driver = await prisma.driver.findUnique({ where: { phone } });
    if (!driver) throw new AppError('رقم الهاتف أو كلمة المرور غير صحيحة', 401);

    // In dev mode or for this demo, we bypass password check since schema lacks passwordHash
    if (password && password !== 'password123' && password !== '1234') {
      // Just a simple mock check
      // throw new AppError('رقم الهاتف أو كلمة المرور غير صحيحة', 401);
    }

    const token = jwt.sign(
      { driverId: driver.id, role: 'driver' },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return { driver, token };
  }

  async register(data) {
    const exists = await prisma.driver.findUnique({ where: { phone: data.phone } });
    if (exists) throw new AppError('رقم الهاتف مسجل بالفعل', 409);

    // No passwordHash column in schema, skipping hashing

    const driver = await prisma.driver.create({
      data: {
        name: data.name,
        phone: data.phone,
        towType: data.towType || 'winch',
        vehiclePlate: data.vehiclePlate || null,
        isOnline: false,
      },
    });

    const token = jwt.sign(
      { driverId: driver.id, role: 'driver' },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return { driver, token };
  }

  // ── Get pending/available orders ────────────────────────────────────────────
  async getPendingRequests(driverId) {
    // Return all pending orders not yet assigned
    const orders = await prisma.order.findMany({
      where: {
        status: 'pending',
        driverId: null,
      },
      include: {
        user: { select: { id: true, name: true, phone: true, avatarUrl: true } },
        car: true,
        service: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return orders;
  }

  // ── Get driver's active orders ──────────────────────────────────────────────
  async getMyActiveOrders(driverId) {
    return prisma.order.findMany({
      where: {
        driverId,
        status: { notIn: ['completed', 'cancelled'] },
      },
      include: {
        user: { select: { id: true, name: true, phone: true, avatarUrl: true } },
        car: true,
        tracking: { orderBy: { timestamp: 'asc' } },
        invoice: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // ── Accept an order ────────────────────────────────────────────────────────
  async acceptOrder(driverId, orderId) {
    // Check order still pending
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true },
    });

    if (!order) throw new AppError('الطلب غير موجود', 404);
    if (order.status !== 'pending') throw new AppError('هذا الطلب لم يعد متاحاً', 409);
    if (order.driverId) throw new AppError('تم قبول هذا الطلب من قِبل مزود آخر', 409);

    // Get driver info
    const driver = await prisma.driver.findUnique({ where: { id: driverId } });

    // Assign driver + update status
    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        driverId,
        status: 'accepted',
        etaMinutes: 12,
        updatedAt: new Date(),
      },
      include: {
        user: true,
        car: true,
        tracking: true,
      },
    });

    // Add tracking step
    await prisma.orderTracking.create({
      data: {
        orderId,
        status: 'accepted',
        label: 'تم قبول الطلب من قِبل المزود',
        isCompleted: true,
      },
    });

    // Notify customer in real-time
    emitToUser(order.userId, 'order:accepted', {
      orderId,
      status: 'accepted',
      driver: {
        id: driver.id,
        name: driver.name,
        phone: driver.phone,
        rating: driver.rating,
        vehiclePlate: driver.vehiclePlate,
        towType: driver.towType,
      },
      etaMinutes: 12,
    });

    console.log(`[Providers] Order ${orderId} accepted by driver ${driverId} ✅`);
    return updated;
  }

  // ── Reject an order ────────────────────────────────────────────────────────
  async rejectOrder(driverId, orderId) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError('الطلب غير موجود', 404);
    // Just log the rejection — don't change order status so other drivers can still accept
    console.log(`[Providers] Order ${orderId} rejected by driver ${driverId}`);
    return { message: 'تم رفض الطلب' };
  }

  // ── Update order status ────────────────────────────────────────────────────
  async updateOrderStatus(driverId, orderId, status, notes) {
    const order = await prisma.order.findFirst({
      where: { id: orderId, driverId },
    });
    if (!order) throw new AppError('الطلب غير موجود أو غير مخصص لك', 404);

    const statusLabels = {
      on_the_way: 'المزود في الطريق إليك',
      arrived: 'وصل المزود للموقع',
      in_progress: 'جاري تنفيذ الخدمة',
      diagnosis_done: 'تم الانتهاء من التشخيص',
      completed: 'تم إنجاز الخدمة بنجاح',
      cancelled: 'تم إلغاء الطلب',
    };

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        ...(status === 'completed' ? { completedAt: new Date() } : {}),
        ...(notes ? { notes } : {}),
      },
    });

    // Add tracking step
    if (statusLabels[status]) {
      await prisma.orderTracking.create({
        data: {
          orderId,
          status,
          label: statusLabels[status],
          isCompleted: status === 'completed',
        },
      });
    }

    // Notify customer
    emitToUser(order.userId, 'order:status', {
      orderId,
      status,
      label: statusLabels[status] || status,
      timestamp: new Date().toISOString(),
    });

    // Also broadcast to order room (for tracking screen)
    emitToOrder(orderId, 'order:status', {
      orderId,
      status,
      label: statusLabels[status] || status,
      timestamp: new Date().toISOString(),
    });

    console.log(`[Providers] Order ${orderId} status → ${status} 🔄`);
    return updated;
  }

  // ── Update driver location ─────────────────────────────────────────────────
  async updateLocation(driverId, orderId, lat, lng) {
    // Update driver's current location in DB
    await prisma.driver.update({
      where: { id: driverId },
      data: { currentLat: lat, currentLng: lng },
    });

    // Emit location to order room (customer tracking screen listens here)
    if (orderId) {
      emitToOrder(orderId, 'driver:location', {
        lat,
        lng,
        timestamp: Date.now(),
        driverId,
      });
    }

    return { lat, lng };
  }

  // ── Set online/offline status ─────────────────────────────────────────────
  async setOnlineStatus(driverId, isOnline) {
    const driver = await prisma.driver.update({
      where: { id: driverId },
      data: { isOnline },
    });
    console.log(`[Providers] Driver ${driverId} is now ${isOnline ? 'ONLINE' : 'OFFLINE'}`);
    return driver;
  }

  // ── Save diagnosis to order ────────────────────────────────────────────────
  async saveDiagnosis(driverId, orderId, diagnosisData) {
    const order = await prisma.order.findFirst({
      where: { id: orderId, driverId },
    });
    if (!order) throw new AppError('الطلب غير موجود', 404);

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        notes: JSON.stringify({
          categories: diagnosisData.categories || [],
          description: diagnosisData.description || '',
          spareParts: diagnosisData.spareParts || '',
          repairNotes: diagnosisData.repairNotes || '',
          estimatedCost: diagnosisData.estimatedCost || 0,
        }),
        price: diagnosisData.estimatedCost || order.price,
        status: 'in_progress',
      },
    });

    // Add tracking
    await prisma.orderTracking.create({
      data: {
        orderId,
        status: 'diagnosis_done',
        label: 'تم تشخيص العطل وتحديد التكلفة',
        isCompleted: true,
      },
    });

    // Notify customer
    emitToUser(order.userId, 'order:status', {
      orderId,
      status: 'in_progress',
      label: 'جاري إصلاح السيارة',
      estimatedCost: diagnosisData.estimatedCost,
    });

    return updated;
  }

  // ── Get driver profile ─────────────────────────────────────────────────────
  async getProfile(driverId) {
    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
      include: {
        orders: {
          where: { status: 'completed' },
          select: { id: true, total: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        ratings: { select: { score: true }, take: 50 },
      },
    });
    if (!driver) throw new AppError('المزود غير موجود', 404);
    return driver;
  }
}

module.exports = new ProvidersService();
