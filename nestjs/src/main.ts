import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const GLOBAL_PREFIX = '/sap/c4c/api/v1/msgraph-hello';
  app.setGlobalPrefix(GLOBAL_PREFIX);
  await app.listen(3000);

}
bootstrap();
