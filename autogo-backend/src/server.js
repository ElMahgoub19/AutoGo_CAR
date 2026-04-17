// AutoGo Backend - Server Entry Point
require('dotenv').config();
const http = require('http');
const app = require('./app');
const { initSocket } = require('./config/socket');

const PORT = process.env.PORT || 5000;

// Create HTTP server (needed for Socket.IO)
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║                                          ║
  ║   🚗  AutoGo Backend API                 ║
  ║                                          ║
  ║   Port:    ${PORT}                         ║
  ║   Mode:    ${process.env.NODE_ENV || 'development'}              ║
  ║   Health:  http://localhost:${PORT}/api/health ║
  ║   Socket:  ws://localhost:${PORT}            ║
  ║                                          ║
  ╚══════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM received. Shutting down...');
  server.close(() => process.exit(0));
});

process.on('unhandledRejection', (err) => {
  console.error('[Unhandled Rejection]', err.message);
});
