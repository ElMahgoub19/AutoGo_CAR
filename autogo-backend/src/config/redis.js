// AutoGo Backend - Redis Client
const Redis = require('ioredis');

let redis = null;

const getRedis = () => {
  if (!redis) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        if (times > 3) {
          console.warn('[Redis] Max retries reached, running without Redis cache');
          return null;
        }
        return Math.min(times * 200, 2000);
      },
      lazyConnect: true,
    });

    redis.on('connect', () => console.log('[Redis] Connected'));
    redis.on('error', (err) => console.warn('[Redis] Error:', err.message));
  }
  return redis;
};

// Store OTP with TTL (5 minutes)
const storeOTP = async (phone, otp) => {
  try {
    const client = getRedis();
    await client.set(`otp:${phone}`, otp, 'EX', 300);
  } catch {
    // Fallback: store in memory if Redis unavailable
    if (!global._otpStore) global._otpStore = {};
    global._otpStore[phone] = { otp, expires: Date.now() + 300000 };
  }
};

// Verify OTP
const verifyOTP = async (phone, otp) => {
  try {
    const client = getRedis();
    const stored = await client.get(`otp:${phone}`);
    if (stored === otp) {
      await client.del(`otp:${phone}`);
      return true;
    }
    return false;
  } catch {
    // Fallback
    if (global._otpStore?.[phone]) {
      const entry = global._otpStore[phone];
      if (entry.otp === otp && entry.expires > Date.now()) {
        delete global._otpStore[phone];
        return true;
      }
    }
    return false;
  }
};

// Cache driver locations (for tracking)
const cacheDriverLocation = async (driverId, lat, lng) => {
  try {
    const client = getRedis();
    await client.set(
      `driver:location:${driverId}`,
      JSON.stringify({ lat, lng, timestamp: Date.now() }),
      'EX', 60
    );
  } catch {}
};

const getDriverLocation = async (driverId) => {
  try {
    const client = getRedis();
    const data = await client.get(`driver:location:${driverId}`);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

module.exports = {
  getRedis,
  storeOTP,
  verifyOTP,
  cacheDriverLocation,
  getDriverLocation,
};
