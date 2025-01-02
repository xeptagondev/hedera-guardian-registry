import { Module } from "@nestjs/common";
import { ApiServiceController } from "./api-service.controller";
import { ApiServiceService } from "./api-service.service";
import { CoreModule } from "libs/core/core.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "libs/shared/shared.module";
import { UserEntity } from "libs/shared/entities/user.entity";
import { OrganizationEntity } from "libs/shared/entities/organization.entity";
import { UserRoleEntity } from "libs/shared/entities/user.role.entity";
import { OrganizationTypeEntity } from "libs/shared/entities/organization.type.entity";

@Module({
  imports: [
    CoreModule,
    SharedModule,
    TypeOrmModule.forFeature([
      UserEntity,
      OrganizationEntity,
      UserRoleEntity,
      OrganizationTypeEntity,
    ]),
  ],
  controllers: [ApiServiceController],
  providers: [ApiServiceService],
})
export class ApiServiceModule {}
