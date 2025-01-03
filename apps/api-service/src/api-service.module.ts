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
import { OrganizationController } from "./organization/organization.controller";
import { UserController } from "./user/user.controller";
import { OrganizationModule } from "libs/shared/organization/organization.module";
import { OrganizationService } from "libs/shared/organization/src/organization/organization.service";
import { UserService } from "libs/shared/user/src/user/user.service";

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
  controllers: [ApiServiceController, OrganizationController, UserController],
  providers: [ApiServiceService, OrganizationService, UserService],
})
export class ApiServiceModule {}
