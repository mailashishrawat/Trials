
// src/chat/chat.module.ts
import { Logger, Module } from '@nestjs/common';
import { ChatGateway, SocketHelper } from './chat.gateway';
import { SOCKET_IO, socketIoProvider } from './socketioprovider';

@Module({
  imports: [],
  providers: [SocketHelper, ChatGateway],
  exports: [],
})
export class ChatModule {}

