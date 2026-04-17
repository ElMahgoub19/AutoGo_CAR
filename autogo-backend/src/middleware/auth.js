// AutoGo Backend - JWT Authentication Middleware
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'autogo_dev_secret';

// Generate access + refresh tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const refreshToken = jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET || 'autogo_refresh_secret',
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' }
  );

  return { accessToken, refreshToken };
};

// Middleware: verify JWT and attach user to request
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'غير مصرح. يرجى تسجيل الدخول',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        membershipType: true,
        points: true,
        isVerified: true,
        settings: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'المستخدم غير موجود',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'انتهت صلاحية الجلسة. يرجى تسجيل الدخول مجدداً',
        code: 'TOKEN_EXPIRED',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'رمز غير صالح',
    });
  }
};

// Optional auth: doesn't block if no token, but attaches user if present
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, name: true, phone: true },
      });
    }
  } catch {}
  next();
};

module.exports = { authenticate, optionalAuth, generateTokens };
