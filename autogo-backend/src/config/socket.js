// AutoGo Backend - Socket.IO Configuration
const { Server } = require('socket.io');
const { getDriverLocation } = require('./redis');

let io = null;

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // User joins their personal room
    socket.on('join:user', (userId) => {
      socket.join(`user:${userId}`);
      console.log(`[Socket.IO] User ${userId} joined room`);
    });

    // Driver joins their room
    socket.on('join:driver', (driverId) => {
      socket.join(`driver:${driverId}`);
      console.log(`[Socket.IO] Driver ${driverId} joined room`);
    });

    // Join order-specific room (for chat + tracking)
    socket.on('join:order', (orderId) => {
      socket.join(`order:${orderId}`);
      console.log(`[Socket.IO] Joined order room: ${orderId}`);
    });

    // Driver sends location update
    socket.on('driver:location', async (data) => {
      const { orderId, driverId, lat, lng } = data;
      // Broadcast to order room
      socket.to(`order:${orderId}`).emit('driver:location', { lat, lng, timestamp: Date.now() });
    });

    // Chat message
    socket.on('message:send', (data) => {
      const { orderId, message } = data;
      socket.to(`order:${orderId}`).emit('message:new', message);
    });

    // Message read receipt
    socket.on('message:read', (data) => {
      const { orderId, userId } = data;
      socket.to(`order:${orderId}`).emit('message:read', { userId });
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
};

// Helper: emit to a specific user
const emitToUser = (userId, event, data) => {
  if (io) io.to(`user:${userId}`).emit(event, data);
};

// Helper: emit to a specific order room
const emitToOrder = (orderId, event, data) => {
  if (io) io.to(`order:${orderId}`).emit(event, data);
};

module.exports = { initSocket, getIO, emitToUser, emitToOrder };
