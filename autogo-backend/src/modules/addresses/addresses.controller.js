// AutoGo Backend - Addresses Controller
const addressesService = require('./addresses.service');
const { success, created } = require('../../utils/response');

class AddressesController {
  async getUserAddresses(req, res, next) {
    try {
      const addresses = await addressesService.getUserAddresses(req.user.id);
      return success(res, addresses, 'تم جلب العناوين');
    } catch (err) { next(err); }
  }

  async addAddress(req, res, next) {
    try {
      const address = await addressesService.addAddress(req.user.id, req.body);
      return created(res, address, 'تم إضافة العنوان');
    } catch (err) { next(err); }
  }

  async updateAddress(req, res, next) {
    try {
      const address = await addressesService.updateAddress(req.user.id, req.params.id, req.body);
      return success(res, address, 'تم تحديث العنوان');
    } catch (err) { next(err); }
  }

  async deleteAddress(req, res, next) {
    try {
      await addressesService.deleteAddress(req.user.id, req.params.id);
      return success(res, null, 'تم حذف العنوان');
    } catch (err) { next(err); }
  }
}

module.exports = new AddressesController();
