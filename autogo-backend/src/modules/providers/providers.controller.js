// AutoGo Backend - Providers Controller
const providersService = require('./providers.service');

const providersController = {

  // POST /api/providers/auth/login
  async login(req, res, next) {
    try {
      const { phone, password } = req.body;
      if (!phone) return res.status(400).json({ success: false, message: 'رقم الهاتف مطلوب' });

      const result = await providersService.login(phone, password || '');
      console.log(`[Auth] Provider login: ${phone} ✅`);
      res.json({ success: true, data: result, message: 'تم تسجيل الدخول بنجاح' });
    } catch (err) { next(err); }
  },

  // POST /api/providers/auth/register
  async register(req, res, next) {
    try {
      const result = await providersService.register(req.body);
      console.log(`[Auth] Provider registered: ${req.body.phone} ✅`);
      res.status(201).json({ success: true, data: result, message: 'تم التسجيل بنجاح' });
    } catch (err) { next(err); }
  },

  // GET /api/providers/requests — all pending orders for providers to claim
  async getPendingRequests(req, res, next) {
    try {
      const orders = await providersService.getPendingRequests(req.driver.id);
      res.json({ success: true, data: orders, count: orders.length });
    } catch (err) { next(err); }
  },

  // GET /api/providers/my-orders — driver's active orders
  async getMyOrders(req, res, next) {
    try {
      const orders = await providersService.getMyActiveOrders(req.driver.id);
      res.json({ success: true, data: orders });
    } catch (err) { next(err); }
  },

  // POST /api/providers/accept
  async acceptOrder(req, res, next) {
    try {
      const { orderId } = req.body;
      if (!orderId) return res.status(400).json({ success: false, message: 'orderId مطلوب' });

      const order = await providersService.acceptOrder(req.driver.id, orderId);
      res.json({ success: true, data: order, message: 'تم قبول الطلب' });
    } catch (err) { next(err); }
  },

  // POST /api/providers/reject
  async rejectOrder(req, res, next) {
    try {
      const { orderId } = req.body;
      const result = await providersService.rejectOrder(req.driver.id, orderId);
      res.json({ success: true, data: result });
    } catch (err) { next(err); }
  },

  // POST /api/providers/update-status
  async updateStatus(req, res, next) {
    try {
      const { orderId, status, notes } = req.body;
      if (!orderId || !status) {
        return res.status(400).json({ success: false, message: 'orderId و status مطلوبان' });
      }
      const order = await providersService.updateOrderStatus(req.driver.id, orderId, status, notes);
      res.json({ success: true, data: order, message: 'تم تحديث الحالة' });
    } catch (err) { next(err); }
  },

  // POST /api/providers/update-location
  async updateLocation(req, res, next) {
    try {
      const { orderId, lat, lng } = req.body;
      if (!lat || !lng) {
        return res.status(400).json({ success: false, message: 'lat و lng مطلوبان' });
      }
      const result = await providersService.updateLocation(req.driver.id, orderId, lat, lng);
      res.json({ success: true, data: result });
    } catch (err) { next(err); }
  },

  // POST /api/providers/set-status
  async setOnlineStatus(req, res, next) {
    try {
      const { isOnline } = req.body;
      const driver = await providersService.setOnlineStatus(req.driver.id, isOnline);
      res.json({ success: true, data: driver, message: isOnline ? 'أنت الآن متاح' : 'أنت الآن غير متاح' });
    } catch (err) { next(err); }
  },

  // POST /api/providers/save-diagnosis
  async saveDiagnosis(req, res, next) {
    try {
      const { orderId, ...diagnosisData } = req.body;
      if (!orderId) return res.status(400).json({ success: false, message: 'orderId مطلوب' });
      const order = await providersService.saveDiagnosis(req.driver.id, orderId, diagnosisData);
      res.json({ success: true, data: order, message: 'تم حفظ التشخيص' });
    } catch (err) { next(err); }
  },

  // GET /api/providers/profile
  async getProfile(req, res, next) {
    try {
      const profile = await providersService.getProfile(req.driver.id);
      res.json({ success: true, data: profile });
    } catch (err) { next(err); }
  },
};

module.exports = providersController;
