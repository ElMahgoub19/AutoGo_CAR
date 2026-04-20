// AutoGo Backend - Cars Controller
const carsService = require('./cars.service');
const { success, created } = require('../../utils/response');

class CarsController {
  async getUserCars(req, res, next) {
    try {
      const cars = await carsService.getUserCars(req.user.id);
      return success(res, cars, 'تم جلب السيارات');
    } catch (err) { next(err); }
  }

  async getCarById(req, res, next) {
    try {
      const car = await carsService.getCarById(req.user.id, req.params.id);
      return success(res, car);
    } catch (err) { next(err); }
  }

  async addCar(req, res, next) {
    try {
      const car = await carsService.addCar(req.user.id, req.body);
      return created(res, car, 'تم إضافة السيارة بنجاح');
    } catch (err) { next(err); }
  }

  async updateCar(req, res, next) {
    try {
      const car = await carsService.updateCar(req.user.id, req.params.id, req.body);
      return success(res, car, 'تم تحديث السيارة');
    } catch (err) { next(err); }
  }

  async deleteCar(req, res, next) {
    try {
      await carsService.deleteCar(req.user.id, req.params.id);
      return success(res, null, 'تم حذف السيارة');
    } catch (err) { next(err); }
  }

  async setActiveCar(req, res, next) {
    try {
      await carsService.setActiveCar(req.user.id, req.params.id);
      return success(res, null, 'تم تفعيل السيارة');
    } catch (err) { next(err); }
  }
}

module.exports = new CarsController();
