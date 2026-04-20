// AutoGo Backend - Cars Validation
const { z } = require('zod');

const addCarSchema = z.object({
  body: z.object({
    brand: z.string().min(1, 'اسم الماركة مطلوب'),
    model: z.string().min(1, 'اسم الموديل مطلوب'),
    year: z.number().int().min(1990).max(2030),
    plate: z.string().min(1, 'رقم اللوحة مطلوب'),
    color: z.string().optional(),
    mileage: z.number().int().min(0).optional(),
  }),
});

const updateCarSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    brand: z.string().optional(),
    model: z.string().optional(),
    year: z.number().int().optional(),
    plate: z.string().optional(),
    color: z.string().optional(),
    mileage: z.number().int().min(0).optional(),
    status: z.string().optional(),
  }),
});

module.exports = { addCarSchema, updateCarSchema };
