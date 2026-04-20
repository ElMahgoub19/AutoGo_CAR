// AutoGo Backend - Wallet Controller
const walletService = require('./wallet.service');
const { success } = require('../../utils/response');

class WalletController {
  async getWallet(req, res, next) {
    try {
      const wallet = await walletService.getWallet(req.user.id);
      return success(res, wallet, 'تم جلب المحفظة');
    } catch (err) { next(err); }
  }

  async deposit(req, res, next) {
    try {
      const result = await walletService.deposit(req.user.id, req.body);
      return success(res, result, 'تم الإيداع بنجاح');
    } catch (err) { next(err); }
  }

  async getTransactions(req, res, next) {
    try {
      const transactions = await walletService.getTransactions(req.user.id);
      return success(res, transactions, 'تم جلب المعاملات');
    } catch (err) { next(err); }
  }
}

module.exports = new WalletController();
