import { Module } from "@nestjs/common";
import { ApiServiceModule } from "./api-service.module";
import { AppConfigModule } from "./app-config.module";

@Module({
  imports: [AppConfigModule, ApiServiceModule],
})
export class ApiServiceRootModule {}
