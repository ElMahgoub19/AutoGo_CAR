// AutoGo Backend - Users Validation Schemas
const { z } = require('zod');

const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل').optional(),
    email: z.string().email('البريد الإلكتروني غير صالح').optional().or(z.literal('')),
    city: z.string().optional(),
  }),
});

const updateSettingsSchema = z.object({
  body: z.object({
    settings: z.record(z.any()),
  }),
});

const updateFcmTokenSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'الرمز مطلوب'),
  }),
});

module.exports = {
  updateProfileSchema,
  updateSettingsSchema,
  updateFcmTokenSchema,
};
