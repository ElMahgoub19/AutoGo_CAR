// AutoGo Backend - Auth Service (Business Logic)
const prisma = require('../../config/database');
const { storeOTP, verifyOTP: verifyRedisOTP } = require('../../config/redis');
const { generateOTP } = require('../../utils/otp');
const { sendOTPMessage } = require('../../utils/sms');
const { generateTokens } = require('../../middleware/auth');
const { AppError } = require('../../middleware/errorHandler');

class AuthService {
  // Send OTP to phone number
  async sendOTP(phone) {
    const otp = generateOTP();
    await storeOTP(phone, otp);
    await sendOTPMessage(phone, otp);

    return { phone, otpSent: true };
  }

  // Verify OTP and return JWT tokens
  async verifyOTP(phone, otp) {
    // In development, accept '1234' always
    const isDev = process.env.NODE_ENV === 'development';
    const isValid = isDev ? (otp === '1234' || otp.length === 4) : await verifyRedisOTP(phone, otp);

    if (!isValid) {
      throw new AppError('رمز التحقق غير صحيح', 400);
    }

    // Find or create user
    let user = await prisma.user.findUnique({ where: { phone } });

    if (!user) {
      // Auto-create user on first OTP verification
      user = await prisma.user.create({
        data: {
          name: 'مستخدم جديد',
          phone,
          isVerified: true,
          wallet: { create: { balance: 0 } },
        },
        include: { wallet: true },
      });
    } else if (!user.isVerified) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true },
      });
    }

    const tokens = generateTokens(user.id);

    return {
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        city: user.city,
        avatarUrl: user.avatarUrl,
        membershipType: user.membershipType,
        points: user.points,
      },
      ...tokens,
    };
  }

  // Sign up with full profile
  async signUp({ name, phone, email }) {
    // Check if phone already exists
    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) {
      throw new AppError('رقم الجوال مسجل بالفعل', 409);
    }

    // Check email uniqueness if provided
    if (email) {
      const emailExists = await prisma.user.findUnique({ where: { email } });
      if (emailExists) {
        throw new AppError('البريد الإلكتروني مسجل بالفعل', 409);
      }
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email: email || null,
        wallet: { create: { balance: 0 } },
      },
    });

    // Send OTP for verification
    const otp = generateOTP();
    await storeOTP(phone, otp);
    await sendOTPMessage(phone, otp);

    return { phone, otpSent: true, userId: user.id };
  }

  // Reset password (send OTP to registered phone/email)
  async resetPassword({ method, value }) {
    let user;

    if (method === 'phone') {
      user = await prisma.user.findUnique({ where: { phone: value } });
    } else {
      user = await prisma.user.findUnique({ where: { email: value } });
    }

    if (!user) {
      throw new AppError('الحساب غير موجود', 404);
    }

    const otp = generateOTP();
    await storeOTP(user.phone, otp);
    await sendOTPMessage(user.phone, otp);

    return { method, sent: true };
  }

  // Refresh access token
  async refreshToken(refreshToken) {
    const jwt = require('jsonwebtoken');
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'autogo_refresh_secret');
      if (decoded.type !== 'refresh') {
        throw new AppError('رمز غير صالح', 401);
      }

      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
      if (!user) {
        throw new AppError('المستخدم غير موجود', 404);
      }

      const tokens = generateTokens(user.id);
      return tokens;
    } catch (err) {
      throw new AppError('رمز التحديث غير صالح أو منتهي', 401);
    }
  }
}

module.exports = new AuthService();
