// AutoGo Backend - OTP Utility
const generateOTP = (length = 4) => {
  // Generate a random numeric OTP
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  // In development, always use 1234 for easy testing
  if (process.env.NODE_ENV === 'development') {
    return '1234';
  }

  return otp;
};

module.exports = { generateOTP };
