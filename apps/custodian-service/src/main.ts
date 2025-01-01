import { NestFactory } from "@nestjs/core";
import { CustodianServiceModule } from "./custodian-service.module";

async function bootstrap() {
  const app = await NestFactory.create(CustodianServiceModule);
  await app.listen(process.env.CUSTODIAN_SERVICE_PORT || 3002);
}
bootstrap();
