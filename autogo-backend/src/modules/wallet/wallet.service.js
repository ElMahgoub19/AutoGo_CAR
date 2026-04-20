// AutoGo Backend - Wallet Service
const prisma = require('../../config/database');
const { AppError } = require('../../middleware/errorHandler');

class WalletService {
  async getWallet(userId) {
    let wallet = await prisma.wallet.findUnique({
      where: { userId },
      include: { transactions: { orderBy: { createdAt: 'desc' }, take: 20 } },
    });
    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: { userId, balance: 0 },
        include: { transactions: true },
      });
    }
    return wallet;
  }

  async deposit(userId, { amount, paymentMethod, title }) {
    const wallet = await this._getOrCreateWallet(userId);
    const [updatedWallet, transaction] = await prisma.$transaction([
      prisma.wallet.update({
        where: { id: wallet.id },
        data: { balance: { increment: amount } },
      }),
      prisma.transaction.create({
        data: {
          walletId: wallet.id,
          type: 'deposit',
          amount,
          title: title || 'إيداع',
          paymentMethod: paymentMethod || 'cash',
          status: 'completed',
        },
      }),
    ]);
    return { balance: updatedWallet.balance, transaction };
  }

  async getTransactions(userId) {
    const wallet = await this._getOrCreateWallet(userId);
    return prisma.transaction.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async _getOrCreateWallet(userId) {
    let wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) {
      wallet = await prisma.wallet.create({ data: { userId, balance: 0 } });
    }
    return wallet;
  }
}

module.exports = new WalletService();
