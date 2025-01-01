import { Logger, Module } from "@nestjs/common";
import { ApiServiceController } from "./api-service.controller";
import { ConfigModule } from "@nestjs/config";
import configuration from "../configuration";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`],
    }),
  ],
  controllers: [ApiServiceController],
  providers: [Logger],
})
export class ApiServiceModule {}
