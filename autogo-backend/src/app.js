// AutoGo Backend - Express Application Setup
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');

// Import route modules
const authRoutes = require('./modules/auth/auth.routes');

const app = express();

// ─── Global Middleware ────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: '*', // Configure per environment in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ─── Health Check ─────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'AutoGo API is running 🚗',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────
app.use('/api/auth', authRoutes);

// Future modules (uncomment as implemented):
app.use('/api/users', require('./modules/users/users.routes'));
// app.use('/api/cars', require('./modules/cars/cars.routes'));
// app.use('/api/services', require('./modules/services/services.routes'));
// app.use('/api/workshops', require('./modules/workshops/workshops.routes'));
// app.use('/api/orders', require('./modules/orders/orders.routes'));
// app.use('/api/wallet', require('./modules/wallet/wallet.routes'));
// app.use('/api/notifications', require('./modules/notifications/notifications.routes'));
// app.use('/api/addresses', require('./modules/addresses/addresses.routes'));

// ─── 404 Handler ──────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `المسار ${req.originalUrl} غير موجود`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
