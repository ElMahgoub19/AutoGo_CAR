// AutoGo Backend - Global Error Handler
const errorHandler = (err, req, res, next) => {
  console.error('[Error]', err.message);

  // Prisma errors
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'هذا السجل موجود بالفعل',
      field: err.meta?.target?.[0],
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'السجل غير موجود',
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'رمز غير صالح',
    });
  }

  // Default
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'حدث خطأ في الخادم',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

module.exports = { errorHandler, AppError };
