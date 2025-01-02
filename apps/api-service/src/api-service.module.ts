import { Module } from "@nestjs/common";
import { ApiServiceController } from "./api-service.controller";
import { ApiServiceService } from "./api-service.service";
import { CoreModule } from "libs/core/core.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "libs/shared/shared.module";
import { UserEntity } from "libs/shared/entities/user.entity";

@Module({
  imports: [CoreModule, SharedModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [ApiServiceController],
  providers: [ApiServiceService],
})
export class ApiServiceModule {}
