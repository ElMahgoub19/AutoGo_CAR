// AutoGo Backend - Response Helpers
const success = (res, data, message = 'تمت العملية بنجاح', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const created = (res, data, message = 'تم الإنشاء بنجاح') => {
  return success(res, data, message, 201);
};

const paginated = (res, data, total, page, limit) => {
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

module.exports = { success, created, paginated };
