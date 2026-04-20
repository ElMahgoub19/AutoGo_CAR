// AutoGo Backend - Wallet Routes
const { Router } = require('express');
const walletController = require('./wallet.controller');
const { authenticate } = require('../../middleware/auth');

const router = Router();
router.use(authenticate);

router.get('/', walletController.getWallet);
router.post('/deposit', walletController.deposit);
router.get('/transactions', walletController.getTransactions);

module.exports = router;
