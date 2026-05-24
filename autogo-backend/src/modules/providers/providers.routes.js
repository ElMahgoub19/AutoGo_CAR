// AutoGo Backend - Providers Routes
const { Router } = require('express');
const providersController = require('./providers.controller');
const jwt = require('jsonwebtoken');
const prisma = require('../../config/database');

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'autogo_dev_secret';

// ── Provider JWT Middleware (separate from user auth) ─────────────────────────
const authenticateDriver = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'غير مصرح' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.driverId) {
      return res.status(401).json({ success: false, message: 'رمز غير صالح' });
    }

    const driver = await prisma.driver.findUnique({ where: { id: decoded.driverId } });
    if (!driver) {
      return res.status(401).json({ success: false, message: 'المزود غير موجود' });
    }

    req.driver = driver;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'رمز غير صالح أو منتهي الصلاحية' });
  }
};

// ── Public routes (no auth) ───────────────────────────────────────────────────
router.post('/auth/login', providersController.login);
router.post('/auth/register', providersController.register);

// ── Protected routes (require driver JWT) ─────────────────────────────────────
router.use(authenticateDriver);

router.get('/requests', providersController.getPendingRequests);
router.get('/my-orders', providersController.getMyOrders);
router.get('/profile', providersController.getProfile);

router.post('/accept', providersController.acceptOrder);
router.post('/reject', providersController.rejectOrder);
router.post('/update-status', providersController.updateStatus);
router.post('/update-location', providersController.updateLocation);
router.post('/set-status', providersController.setOnlineStatus);
router.post('/save-diagnosis', providersController.saveDiagnosis);

module.exports = router;
