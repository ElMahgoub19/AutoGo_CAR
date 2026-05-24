// AutoGo Backend - Orders Service
const prisma = require('../../config/database');
const { AppError } = require('../../middleware/errorHandler');
const { emitToUser, emitToOrder, emitToAllProviders } = require('../../config/socket');
const { v4: uuidv4 } = require('uuid');

class OrdersService {
  // Create SOS / Tow order
  async createTowOrder(userId, data) {
    // If guest, find-or-create a guest user in DB
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

    const orderNumber = `SOS-${Math.floor(1000 + Math.random() * 9000)}`;
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: resolvedUserId,
        carId: data.carId || null,
        type: 'ونش',
        status: 'pending',
        pickupLat: data.latitude,
        pickupLng: data.longitude,
        pickupAddress: data.address || null,
        price: data.price || 0,
        total: data.price || 0,
        paymentMethod: data.paymentMethod || 'cash',
        notes: data.notes || null,
        tracking: {
          create: [
            { status: 'confirmed', label: 'تم تأكيد الطلب', isCompleted: true },
          ],
        },
      },
      include: { car: true, tracking: true },
    });

    // Try to find nearest available driver
    const drivers = await prisma.driver.findMany({ where: { isOnline: true } });
    if (drivers.length > 0) {
      const driver = drivers[0]; // Simplified: pick first online driver
      await prisma.order.update({
        where: { id: order.id },
        data: { driverId: driver.id, status: 'driver_assigned', etaMinutes: 7 },
      });
      await prisma.orderTracking.create({
        data: { orderId: order.id, status: 'driver_assigned', label: 'تم إرسال الونش', isCompleted: true },
      });
      await prisma.orderTracking.create({
        data: { orderId: order.id, status: 'on_way', label: 'في الطريق إليك', isCompleted: false },
      });

      emitToUser(resolvedUserId, 'order:driver_found', { orderId: order.id, driver });
    }

    // Fetch real customer and car details for the provider app payload
    const resolvedUser = await prisma.user.findUnique({ where: { id: resolvedUserId } });
    const carDetails = data.carId ? await prisma.car.findUnique({ where: { id: data.carId } }) : null;

    // Broadcast new order to ALL online providers in real-time
    emitToAllProviders('order:new', {
      orderId: order.id,
      orderNumber: order.orderNumber,
      type: order.type,
      status: order.status,
      pickupAddress: order.pickupAddress,
      pickupLat: data.latitude,
      pickupLng: data.longitude,
      estimatedPrice: data.price || 0,
      createdAt: order.createdAt,
      customer: {
        name: resolvedUser?.name || data.customerName || 'عميل جديد',
        phone: resolvedUser?.phone || data.customerPhone || '',
      },
      vehicle: {
        type: carDetails ? carDetails.brand : (data.carType || 'سيارة'),
        model: carDetails ? carDetails.model : (data.carModel || ''),
        plate: carDetails ? carDetails.plate : (data.carPlate || ''),
        color: carDetails ? carDetails.color : (data.carColor || ''),
      },
      problem: {
        type: data.issueType || 'عطل عام',
        description: data.notes || '',
        severity: data.severity || 'medium',
      },
    });

    console.log(`[Orders] New SOS order ${order.orderNumber} broadcasted to all providers`);
    return order;
  }


  // Create booking order (maintenance)
  async createBookingOrder(userId, data) {
    const orderNumber = `MNT-${Math.floor(1000 + Math.random() * 9000)}`;
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        carId: data.carId || null,
        workshopId: data.workshopId || null,
        serviceId: data.serviceId || null,
        type: 'صيانة',
        status: 'pending',
        scheduledDate: data.date ? new Date(data.date) : null,
        scheduledTime: data.time ? new Date(`1970-01-01T${data.time}`) : null,
        serviceMethod: data.serviceMethod || null,
        price: data.price || 0,
        total: data.price || 0,
        paymentMethod: data.paymentMethod || 'cash',
        notes: data.notes || null,
        tracking: {
          create: [
            { status: 'confirmed', label: 'تم تأكيد الحجز', isCompleted: true },
          ],
        },
      },
      include: { car: true, workshop: true, service: true, tracking: true },
    });
    return order;
  }

  // Get user's active orders
  async getActiveOrders(userId) {
    return prisma.order.findMany({
      where: { userId, status: { notIn: ['completed', 'cancelled'] } },
      include: { car: true, driver: true, workshop: true, service: true, tracking: { orderBy: { timestamp: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get user's order history
  async getOrderHistory(userId) {
    return prisma.order.findMany({
      where: { userId, status: { in: ['completed', 'cancelled'] } },
      include: { car: true, driver: true, workshop: true, service: true, rating: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get single order
  async getOrderById(userId, orderId) {
    const order = await prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        car: true, driver: true, workshop: true, service: true,
        tracking: { orderBy: { timestamp: 'asc' } },
        messages: { orderBy: { createdAt: 'asc' } },
        rating: true, invoice: true,
      },
    });
    if (!order) throw new AppError('الطلب غير موجود', 404);
    return order;
  }

  // Update order status
  async updateOrderStatus(userId, orderId, status) {
    const order = await prisma.order.findFirst({ where: { id: orderId, userId } });
    if (!order) throw new AppError('الطلب غير موجود', 404);

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        ...(status === 'completed' ? { completedAt: new Date() } : {}),
      },
    });

    // Add tracking step
    const labels = {
      driver_assigned: 'تم إرسال الونش',
      on_way: 'في الطريق إليك',
      arrived: 'الوصول للموقع',
      in_progress: 'جاري التنفيذ',
      completed: 'تم الانتهاء',
      cancelled: 'تم الإلغاء',
    };
    if (labels[status]) {
      await prisma.orderTracking.create({
        data: { orderId, status, label: labels[status], isCompleted: status === 'completed' },
      });
    }

    emitToOrder(orderId, 'order:status', { orderId, status });
    return updated;
  }

  // Cancel order
  async cancelOrder(userId, orderId) {
    return this.updateOrderStatus(userId, orderId, 'cancelled');
  }

  // Rate order
  async rateOrder(userId, orderId, { score, comment, tags }) {
    const order = await prisma.order.findFirst({ where: { id: orderId, userId } });
    if (!order) throw new AppError('الطلب غير موجود', 404);

    const rating = await prisma.rating.create({
      data: {
        orderId,
        userId,
        driverId: order.driverId,
        workshopId: order.workshopId,
        score,
        comment: comment || null,
        tags: tags || [],
      },
    });

    // Update driver/workshop average rating
    if (order.driverId) {
      const agg = await prisma.rating.aggregate({ where: { driverId: order.driverId }, _avg: { score: true }, _count: true });
      await prisma.driver.update({
        where: { id: order.driverId },
        data: { rating: agg._avg.score || 0, reviewCount: agg._count },
      });
    }

    return rating;
  }
}

module.exports = new OrdersService();
