// AutoGo Backend - Socket.IO Configuration
// Handles real-time events for: order creation, status updates, location tracking, chat
const { Server } = require('socket.io');

let io = null;

// Track online provider socket IDs
const onlineProviders = new Map(); // driverId → socketId

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // ── Customer joins their personal room ────────────────────────────────────
    socket.on('join:user', (userId) => {
      socket.join(`user:${userId}`);
      console.log(`[Socket.IO] Customer ${userId} joined room`);
    });

    // ── Provider (Driver) joins their room + providers broadcast room ──────────
    socket.on('join:provider', (driverId) => {
      socket.join(`driver:${driverId}`);
      socket.join('providers'); // Broadcast room — all online providers
      onlineProviders.set(driverId, socket.id);
      console.log(`[Socket.IO] Provider ${driverId} joined room (online: ${onlineProviders.size})`);
    });

    // ── Join order-specific room (for chat + tracking) ─────────────────────────
    socket.on('join:order', (orderId) => {
      socket.join(`order:${orderId}`);
      console.log(`[Socket.IO] Joined order room: ${orderId}`);
    });

    // ── Driver sends live GPS location ─────────────────────────────────────────
    socket.on('driver:location', async (data) => {
      const { orderId, driverId, lat, lng } = data;
      // Broadcast to all in the order room (customer sees this)
      socket.to(`order:${orderId}`).emit('driver:location', {
        lat,
        lng,
        driverId,
        timestamp: Date.now(),
      });
    });

    // ── Driver goes online/offline ─────────────────────────────────────────────
    socket.on('provider:online', (driverId) => {
      onlineProviders.set(driverId, socket.id);
      socket.join('providers');
      console.log(`[Socket.IO] Provider ${driverId} is ONLINE`);
    });

    socket.on('provider:offline', (driverId) => {
      onlineProviders.delete(driverId);
      socket.leave('providers');
      console.log(`[Socket.IO] Provider ${driverId} is OFFLINE`);
    });

    // ── Chat message ───────────────────────────────────────────────────────────
    socket.on('message:send', (data) => {
      const { orderId, message } = data;
      socket.to(`order:${orderId}`).emit('message:new', message);
    });

    socket.on('message:read', (data) => {
      const { orderId, userId } = data;
      socket.to(`order:${orderId}`).emit('message:read', { userId });
    });

    socket.on('disconnect', () => {
      // Clean up provider tracking
      for (const [driverId, sid] of onlineProviders.entries()) {
        if (sid === socket.id) {
          onlineProviders.delete(driverId);
          console.log(`[Socket.IO] Provider ${driverId} disconnected`);
          break;
        }
      }
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
};

// ── Emit to a specific customer ────────────────────────────────────────────────
const emitToUser = (userId, event, data) => {
  if (io) {
    io.to(`user:${userId}`).emit(event, data);
    console.log(`[Socket.IO] → User ${userId}: ${event}`);
  }
};

// ── Emit to ALL online providers (new order broadcast) ─────────────────────────
const emitToAllProviders = (event, data) => {
  if (io) {
    io.to('providers').emit(event, data);
    console.log(`[Socket.IO] → All providers (${onlineProviders.size} online): ${event}`);
  }
};

// ── Emit to a specific order room ──────────────────────────────────────────────
const emitToOrder = (orderId, event, data) => {
  if (io) {
    io.to(`order:${orderId}`).emit(event, data);
  }
};

// ── Emit to a specific driver ──────────────────────────────────────────────────
const emitToDriver = (driverId, event, data) => {
  if (io) {
    io.to(`driver:${driverId}`).emit(event, data);
    console.log(`[Socket.IO] → Driver ${driverId}: ${event}`);
  }
};

const getOnlineProviderCount = () => onlineProviders.size;

module.exports = {
  initSocket,
  getIO,
  emitToUser,
  emitToAllProviders,
  emitToOrder,
  emitToDriver,
  getOnlineProviderCount,
};
