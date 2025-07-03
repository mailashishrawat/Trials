import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Server} from 'socket.io';
import { emit } from 'process';
import { Console } from 'console';
import { Logger } from '@nestjs/common';
import { SOCKET_IO } from './chat/socketioprovider';
import { SocketHelper } from './chat/chat.gateway';
import { IoAdapter } from '@nestjs/platform-socket.io';
async function bootstrap() {
  const logger: Logger = new Logger('main');
  const app = await NestFactory.create(AppModule, {cors:true, logger:['log','error','warn','debug','verbose']});
  const port =3000
  await app.listen(port);
  
  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`WebSocket server is also running on the same port (${port})`);
  const io = new Server(app.getHttpServer(), {cors: {
    origin: '*', // ✅ Allow your Angular app
    methods: ['GET', 'POST'],
    credentials: true // Optional: If you’re sending cookies or auth headers
  }
  })
  app.useWebSocketAdapter(new IoAdapter(app));

 //SocketHelper.setup(io);

//   io.on('connection', (socket) => {
//     console.log(`New client connected: ${socket.id}`);
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//   });
//   socket.on('message', (msg) => {
//       console.log('message: ' + msg.text.toString());
//     });
//  })

//   io.emit('hello', 'world'); 


}
bootstrap();
