// AutoGo Backend - Invoice Routes
const { Router } = require('express');
const invoicesController = require('./invoices.controller');
const jwt = require('jsonwebtoken');
const prisma = require('../../config/database');

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'autogo_dev_secret';

// Driver auth middleware
const authenticateDriver = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'غير مصرح' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.driverId) return res.status(401).json({ success: false, message: 'رمز غير صالح' });
    const driver = await prisma.driver.findUnique({ where: { id: decoded.driverId } });
    if (!driver) return res.status(401).json({ success: false, message: 'المزود غير موجود' });
    req.driver = driver;
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'رمز غير صالح' });
  }
};

router.post('/generate', authenticateDriver, invoicesController.generate);
router.get('/:orderId', invoicesController.getByOrder);

module.exports = router;
