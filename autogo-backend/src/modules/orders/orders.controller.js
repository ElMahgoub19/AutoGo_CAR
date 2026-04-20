// AutoGo Backend - Orders Controller
const ordersService = require('./orders.service');
const { success, created } = require('../../utils/response');

class OrdersController {
  async createTowOrder(req, res, next) {
    try {
      const order = await ordersService.createTowOrder(req.user.id, req.body);
      return created(res, order, 'تم إنشاء طلب الونش');
    } catch (err) { next(err); }
  }

  async createBookingOrder(req, res, next) {
    try {
      const order = await ordersService.createBookingOrder(req.user.id, req.body);
      return created(res, order, 'تم إنشاء الحجز');
    } catch (err) { next(err); }
  }

  async getActiveOrders(req, res, next) {
    try {
      const orders = await ordersService.getActiveOrders(req.user.id);
      return success(res, orders, 'الطلبات النشطة');
    } catch (err) { next(err); }
  }

  async getOrderHistory(req, res, next) {
    try {
      const orders = await ordersService.getOrderHistory(req.user.id);
      return success(res, orders, 'سجل الطلبات');
    } catch (err) { next(err); }
  }

  async getOrderById(req, res, next) {
    try {
      const order = await ordersService.getOrderById(req.user.id, req.params.id);
      return success(res, order);
    } catch (err) { next(err); }
  }

  async updateOrderStatus(req, res, next) {
    try {
      const order = await ordersService.updateOrderStatus(req.user.id, req.params.id, req.body.status);
      return success(res, order, 'تم تحديث حالة الطلب');
    } catch (err) { next(err); }
  }

  async cancelOrder(req, res, next) {
    try {
      await ordersService.cancelOrder(req.user.id, req.params.id);
      return success(res, null, 'تم إلغاء الطلب');
    } catch (err) { next(err); }
  }

  async rateOrder(req, res, next) {
    try {
      const rating = await ordersService.rateOrder(req.user.id, req.params.id, req.body);
      return created(res, rating, 'شكراً على تقييمك');
    } catch (err) { next(err); }
  }
}

module.exports = new OrdersController();
