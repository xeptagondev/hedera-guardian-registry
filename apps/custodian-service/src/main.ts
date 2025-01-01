import { NestFactory } from '@nestjs/core';
import { CustodianServiceModule } from './custodian-service.module';

async function bootstrap() {
  const app = await NestFactory.create(CustodianServiceModule);
  await app.listen(3000);
}
bootstrap();
