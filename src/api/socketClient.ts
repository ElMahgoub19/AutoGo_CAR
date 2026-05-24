import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://192.168.1.234:5000';

class SocketClient {
  public socket: Socket | null = null;
  private currentUserId: string | null = null;

  connect(userId: string) {
    if (this.socket?.connected) {
      if (this.currentUserId !== userId) {
        this.socket.emit('join:user', userId);
        this.currentUserId = userId;
      }
      return this.socket;
    }

    this.socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 10,
    });

    this.socket.on('connect', () => {
      console.log('[Socket] Connected to server as customer:', this.socket?.id);
      this.socket?.emit('join:user', userId);
      this.currentUserId = userId;
    });

    this.socket.on('disconnect', () => {
      console.log('[Socket] Disconnected from server');
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.currentUserId = null;
    }
  }

  joinOrder(orderId: string) {
    this.socket?.emit('join:order', orderId);
  }
}

export default new SocketClient();
