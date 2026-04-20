// AutoGo Backend - Services Controller
const servicesService = require('./services.service');
const { success } = require('../../utils/response');

class ServicesController {
  async getAllServices(req, res, next) {
    try {
      const { category } = req.query;
      const services = await servicesService.getAllServices(category);
      return success(res, services, 'تم جلب الخدمات');
    } catch (err) { next(err); }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await servicesService.getCategories();
      return success(res, categories, 'تم جلب الأقسام');
    } catch (err) { next(err); }
  }

  async getServiceById(req, res, next) {
    try {
      const service = await servicesService.getServiceById(req.params.id);
      return success(res, service);
    } catch (err) { next(err); }
  }
}

module.exports = new ServicesController();
