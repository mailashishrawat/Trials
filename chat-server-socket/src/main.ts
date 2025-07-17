import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Server} from 'socket.io';
import { emit } from 'process';
import { Console } from 'console';
import { Logger } from '@nestjs/common';

import { SocketHelper } from './SocketHelper'
import { IoAdapter } from '@nestjs/platform-socket.io';
async function bootstrap() {
  const logger: Logger = new Logger('main');
  const app = await NestFactory.create(AppModule, {cors:true, logger:['log','error','warn','debug','verbose']});
  const port =process.env.port || '8080'
  const GLOBAL_PREFIX = '/sap/c4c/api/v1/mschat-service';
  app.setGlobalPrefix(GLOBAL_PREFIX);
  await app.listen(port);

  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`version 4 WebSocket server is also running on the same port (${port})`);
   
  const io = new Server(app.getHttpServer(), {cors: {
    origin: '*', // ✅ Allow your Angular app
    methods: ['GET', 'POST','OPTIONS'],

  },
    path: GLOBAL_PREFIX+'/mschat/',
    transports: [ 'polling','websocket'], // Prefer WebSocket
  
  })
  //app.useWebSocketAdapter(new IoAdapter(app));

 new SocketHelper().setup(io);



}
bootstrap();
