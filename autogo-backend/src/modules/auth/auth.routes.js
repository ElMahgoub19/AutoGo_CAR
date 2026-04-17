// AutoGo Backend - Auth Routes
const { Router } = require('express');
const authController = require('./auth.controller');
const { validate } = require('../../middleware/validate');
const { sendOTPSchema, verifyOTPSchema, signUpSchema, resetPasswordSchema } = require('./auth.validation');

const router = Router();

router.post('/send-otp', validate(sendOTPSchema), authController.sendOTP);
router.post('/verify-otp', validate(verifyOTPSchema), authController.verifyOTP);
router.post('/signup', validate(signUpSchema), authController.signUp);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

module.exports = router;
