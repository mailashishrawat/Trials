import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ChatModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'static'), // 👈 path to static folder
    serveRoot: '/static', // 👈 optional: serve files under `/static/*`
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
