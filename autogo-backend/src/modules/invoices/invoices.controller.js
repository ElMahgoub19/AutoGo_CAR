// AutoGo Backend - Invoice Controller
const invoicesService = require('./invoices.service');

const invoicesController = {

  // POST /api/invoice/generate
  async generate(req, res, next) {
    try {
      const invoice = await invoicesService.generateInvoice(req.driver.id, req.body);
      res.status(201).json({ success: true, data: invoice, message: 'تم إنشاء الفاتورة بنجاح' });
    } catch (err) { next(err); }
  },

  // GET /api/invoice/:orderId
  async getByOrder(req, res, next) {
    try {
      const invoice = await invoicesService.getInvoiceByOrder(req.params.orderId);
      res.json({ success: true, data: invoice });
    } catch (err) { next(err); }
  },
};

module.exports = invoicesController;
