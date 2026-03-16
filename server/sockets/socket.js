let ioInstance = null;

/**
 * Initialize Socket.io with HTTP server
 */
const initializeSocket = (server) => {
  const { Server } = require('socket.io');

  ioInstance = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  ioInstance.on('connection', async (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    try {
      const { getQueueState } = require('../services/queueService');
      const state = await getQueueState();

      socket.emit('queueUpdated', {
        success: true,
        data: state,
      });
    } catch (err) {
      console.error('Error sending initial queue state:', err);
      socket.emit('queueError', {
        success: false,
        message: 'Failed to fetch queue state',
      });
    }

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  console.log('✅ Socket.io initialized');
  return ioInstance;
};

/**
 * Emit queue update safely
 */
const emitQueueUpdate = async () => {
  if (!ioInstance) {
    console.warn('⚠️ Socket.io not initialized');
    return;
  }

  try {
    const { getQueueState } = require('../services/queueService');
    const queueState = await getQueueState();

    ioInstance.emit('queueUpdated', {
      success: true,
      data: queueState,
      timestamp: new Date(),
    });

    console.log('📡 Queue update emitted');
  } catch (error) {
    console.error('❌ Error emitting queue update:', error);
  }
};

module.exports = {
  initializeSocket,
  emitQueueUpdate,
};
