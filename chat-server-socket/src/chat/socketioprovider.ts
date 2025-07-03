import { Server } from 'socket.io';

export const SOCKET_IO = 'SOCKET_IO';

export const socketIoProvider = {
  provide: SOCKET_IO,
  useFactory: () => {
    // This will be overridden in main.ts after app.listen
    return null;
  },
};