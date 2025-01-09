import { Module } from "@nestjs/common";
import { ApiLibService } from "./api-lib.service";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

@Module({
  providers: [ApiLibService],
  exports: [ApiLibService],
  imports: [CoreModule, SharedModule],
})
export class ApiLibModule {}
