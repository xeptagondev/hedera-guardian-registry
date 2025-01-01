import { Module } from "@nestjs/common";
import { ApiServiceController } from "./api-service.controller";
import { ApiServiceService } from "./api-service.service";
import { CoreModule } from "libs/core/core.module";

@Module({
  imports: [CoreModule],
  controllers: [ApiServiceController],
  providers: [ApiServiceService],
})
export class ApiServiceModule {}
