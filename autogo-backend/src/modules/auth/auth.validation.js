// AutoGo Backend - Auth Validation Schemas
const { z } = require('zod');

const sendOTPSchema = z.object({
  body: z.object({
    phone: z.string().min(9, 'رقم الجوال غير صالح').max(15),
  }),
});

const verifyOTPSchema = z.object({
  body: z.object({
    phone: z.string().min(9),
    otp: z.string().length(4, 'رمز التحقق يجب أن يكون 4 أرقام'),
  }),
});

const signUpSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
    phone: z.string().min(9, 'رقم الجوال غير صالح').max(15),
    email: z.string().email('البريد الإلكتروني غير صالح').optional().or(z.literal('')),
  }),
});

const resetPasswordSchema = z.object({
  body: z.object({
    method: z.enum(['phone', 'email']),
    value: z.string().min(1, 'القيمة مطلوبة'),
  }),
});

module.exports = {
  sendOTPSchema,
  verifyOTPSchema,
  signUpSchema,
  resetPasswordSchema,
};
