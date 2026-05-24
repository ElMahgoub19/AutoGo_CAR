// AutoGo Backend - Invoice Service
const prisma = require('../../config/database');
const { AppError } = require('../../middleware/errorHandler');
const { emitToUser } = require('../../config/socket');
const { v4: uuidv4 } = require('uuid');

class InvoicesService {

  // Generate invoice number
  _generateInvoiceNo() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `INV-${year}${month}${day}-${random}`;
  }

  // POST /api/invoice/generate
  async generateInvoice(driverId, data) {
    const {
      orderId,
      items = [],
      paymentMethod = 'cash',
      notes,
    } = data;

    // Verify the order exists and belongs to this driver
    const order = await prisma.order.findFirst({
      where: { id: orderId, driverId },
      include: { user: true, car: true, invoice: true },
    });

    if (!order) throw new AppError('الطلب غير موجود أو غير مخصص لك', 404);
    if (order.invoice) {
      // Invoice already exists — return it
      console.log(`[Invoice] Returning existing invoice for order ${orderId}`);
      return order.invoice;
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.price || 0), 0);
    const VAT_RATE = 0.14;
    const tax = parseFloat((subtotal * VAT_RATE).toFixed(2));
    const total = parseFloat((subtotal + tax).toFixed(2));

    const invoiceNo = this._generateInvoiceNo();

    // Create invoice in DB
    const invoice = await prisma.invoice.create({
      data: {
        orderId,
        invoiceNo,
        subtotal,
        tax,
        total,
        items: JSON.stringify(items),
        paymentMethod,
        paymentStatus: 'paid',
      },
    });

    // Update order total + status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        total,
        price: subtotal,
        tax,
        paymentMethod,
        status: 'completed',
        completedAt: new Date(),
      },
    });

    // Add tracking step
    await prisma.orderTracking.create({
      data: {
        orderId,
        status: 'completed',
        label: 'تم إنجاز الخدمة وإصدار الفاتورة',
        isCompleted: true,
      },
    });

    // Notify customer
    emitToUser(order.userId, 'order:completed', {
      orderId,
      status: 'completed',
      invoiceNo,
      total,
      message: 'تم إنجاز الخدمة. يمكنك الآن تقييم المزود.',
    });

    console.log(`[Invoice] Generated invoice ${invoiceNo} for order ${orderId}, total: ${total} EGP ✅`);

    return {
      ...invoice,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        customer: { name: order.user?.name, phone: order.user?.phone },
        car: order.car,
      },
    };
  }

  // GET /api/invoice/:orderId — fetch invoice for an order
  async getInvoiceByOrder(orderId) {
    const invoice = await prisma.invoice.findFirst({
      where: { orderId },
      include: {
        order: {
          include: {
            user: { select: { name: true, phone: true } },
            car: true,
            driver: { select: { name: true, phone: true, rating: true } },
          },
        },
      },
    });
    if (!invoice) throw new AppError('الفاتورة غير موجودة', 404);
    return invoice;
  }
}

module.exports = new InvoicesService();
