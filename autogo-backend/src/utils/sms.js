// AutoGo Backend - SMS Utility (Twilio / Mock)
const sendSMS = async (phone, message) => {
  // In development, just log the message
  if (process.env.NODE_ENV === 'development') {
    console.log(`[SMS Mock] To: ${phone} | Message: ${message}`);
    return { success: true, mock: true };
  }

  // Production: use Twilio
  try {
    const twilio = require('twilio')(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const result = await twilio.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('[SMS Error]', error.message);
    return { success: false, error: error.message };
  }
};

// Send OTP SMS
const sendOTPMessage = async (phone, otp) => {
  const message = `رمز التحقق الخاص بك في AUTOGO هو: ${otp}\nلا تشارك هذا الرمز مع أي شخص.`;
  return sendSMS(phone, message);
};

module.exports = { sendSMS, sendOTPMessage };
