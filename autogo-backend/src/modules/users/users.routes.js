// AutoGo Backend - Users Routes
const { Router } = require('express');
const usersController = require('./users.controller');
const { authenticate } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const { updateProfileSchema, updateSettingsSchema, updateFcmTokenSchema } = require('./users.validation');

const router = Router();

// Only authenticated users can access these routes
router.use(authenticate);

router.get('/me', usersController.getProfile);
router.put('/me', validate(updateProfileSchema), usersController.updateProfile);
router.put('/me/avatar', usersController.updateAvatar);
router.put('/me/settings', validate(updateSettingsSchema), usersController.updateSettings);
router.put('/me/fcm-token', validate(updateFcmTokenSchema), usersController.updateFcmToken);
router.delete('/me', usersController.deleteAccount);

module.exports = router;
