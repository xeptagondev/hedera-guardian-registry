import { Module } from "@nestjs/common";
import { CustodianServiceController } from "./custodian-service.controller";
import { CustodianServiceService } from "./custodian-service.service";
import { CoreModule } from "libs/core/core.module";

@Module({
  imports: [CoreModule],
  controllers: [CustodianServiceController],
  providers: [CustodianServiceService],
})
export class CustodianServiceModule {}
