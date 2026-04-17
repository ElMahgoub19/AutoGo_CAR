// AutoGo Backend - Auth Controller
const authService = require('./auth.service');
const { success } = require('../../utils/response');

class AuthController {
  async sendOTP(req, res, next) {
    try {
      const result = await authService.sendOTP(req.body.phone);
      return success(res, result, 'تم إرسال رمز التحقق');
    } catch (err) {
      next(err);
    }
  }

  async verifyOTP(req, res, next) {
    try {
      const { phone, otp } = req.body;
      const result = await authService.verifyOTP(phone, otp);
      return success(res, result, 'تم التحقق بنجاح');
    } catch (err) {
      next(err);
    }
  }

  async signUp(req, res, next) {
    try {
      const result = await authService.signUp(req.body);
      return success(res, result, 'تم إنشاء الحساب بنجاح. يرجى التحقق من رمز OTP', 201);
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const result = await authService.resetPassword(req.body);
      return success(res, result, 'تم إرسال رمز الاسترداد');
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refreshToken(refreshToken);
      return success(res, tokens, 'تم تحديث الرمز');
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      // Optionally invalidate refresh token in Redis/DB
      return success(res, null, 'تم تسجيل الخروج');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
