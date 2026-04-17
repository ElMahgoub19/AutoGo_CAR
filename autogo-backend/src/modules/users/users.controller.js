// AutoGo Backend - Users Controller
const usersService = require('./users.service');
const { success } = require('../../utils/response');

class UsersController {
  async getProfile(req, res, next) {
    try {
      const profile = await usersService.getProfile(req.user.id);
      return success(res, profile, 'تم استرجاع الملف الشخصي');
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const user = await usersService.updateProfile(req.user.id, req.body);
      return success(res, user, 'تم تحديث البيانات بنجاح');
    } catch (error) {
      next(error);
    }
  }

  async updateAvatar(req, res, next) {
    try {
      // In a real app, you would handle file upload here (e.g., using multer/S3)
      // For now, we expect avatarUrl in the body (if pre-uploaded to cloud)
      const { avatarUrl } = req.body;
      const user = await usersService.updateAvatar(req.user.id, avatarUrl);
      return success(res, user, 'تم تحديث الصورة الشخصية');
    } catch (error) {
      next(error);
    }
  }

  async updateSettings(req, res, next) {
    try {
      const { settings } = req.body;
      const user = await usersService.updateSettings(req.user.id, settings);
      return success(res, user, 'تم تحديث الإعدادات');
    } catch (error) {
      next(error);
    }
  }

  async updateFcmToken(req, res, next) {
    try {
      const { token } = req.body;
      await usersService.updateFcmToken(req.user.id, token);
      return success(res, null, 'تم تحديث رمز الإشعارات');
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req, res, next) {
    try {
      await usersService.deleteAccount(req.user.id);
      return success(res, null, 'تم حذف الحساب بنجاح');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UsersController();
