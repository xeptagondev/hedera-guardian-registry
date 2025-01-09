import { NestFactory } from '@nestjs/core';
import { CustodianModule } from './custodian.module';

async function bootstrap() {
  const app = await NestFactory.create(CustodianModule);
  await app.listen(3000);
}
bootstrap();
