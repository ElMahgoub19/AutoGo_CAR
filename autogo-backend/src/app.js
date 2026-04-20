// AutoGo Backend - Express Application Setup
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');

// Import route modules
const authRoutes = require('./modules/auth/auth.routes');
const usersRoutes = require('./modules/users/users.routes');
const carsRoutes = require('./modules/cars/cars.routes');
const servicesRoutes = require('./modules/services/services.routes');
const workshopsRoutes = require('./modules/workshops/workshops.routes');
const ordersRoutes = require('./modules/orders/orders.routes');
const walletRoutes = require('./modules/wallet/wallet.routes');
const notificationsRoutes = require('./modules/notifications/notifications.routes');
const addressesRoutes = require('./modules/addresses/addresses.routes');

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
app.use('/api/users', usersRoutes);
app.use('/api/cars', carsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/workshops', workshopsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/addresses', addressesRoutes);

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
