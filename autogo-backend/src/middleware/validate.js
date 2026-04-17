// AutoGo Backend - Request Validation Middleware (Zod)
const { ZodError } = require('zod');

// Wraps a Zod schema into Express middleware
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'بيانات غير صالحة',
        errors,
      });
    }
    next(error);
  }
};

module.exports = { validate };
