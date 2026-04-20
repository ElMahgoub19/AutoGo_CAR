// AutoGo Backend - Workshops Controller
const workshopsService = require('./workshops.service');
const { success } = require('../../utils/response');

class WorkshopsController {
  async getAllWorkshops(req, res, next) {
    try {
      const { lat, lng, filter } = req.query;
      const workshops = await workshopsService.getAllWorkshops({
        lat: lat ? parseFloat(lat) : null,
        lng: lng ? parseFloat(lng) : null,
        filter,
      });
      return success(res, workshops, 'تم جلب الورش');
    } catch (err) { next(err); }
  }

  async getWorkshopById(req, res, next) {
    try {
      const workshop = await workshopsService.getWorkshopById(req.params.id);
      return success(res, workshop);
    } catch (err) { next(err); }
  }

  async getNearestWorkshop(req, res, next) {
    try {
      const { lat, lng } = req.query;
      if (!lat || !lng) throw new Error('الموقع مطلوب');
      const workshop = await workshopsService.getNearestWorkshop(parseFloat(lat), parseFloat(lng));
      return success(res, workshop, 'أقرب ورشة');
    } catch (err) { next(err); }
  }
}

module.exports = new WorkshopsController();
