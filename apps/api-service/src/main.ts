import { NestFactory } from "@nestjs/core";
import { ApiServiceRootModule } from "./api-service.root.module";

async function bootstrap() {
  const app = await NestFactory.create(ApiServiceRootModule);
  await app.listen(process.env.API_SERVICE_PORT || 3001);
}
bootstrap();
