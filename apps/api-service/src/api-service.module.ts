import { Module } from "@nestjs/common";
import { ApiServiceController } from "./api-service.controller";
import { ApiServiceService } from "./api-service.service";
import { CoreModule } from "libs/core/core.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "libs/shared/shared.module";
import { UserEntity } from "libs/shared/entities/api/user.entity";
import { RoleEntity } from "libs/shared/entities/api/role.entity";
import { OrganizationTypeEntity } from "libs/shared/entities/api/organization.type.entity";
import { OrganizationController } from "./organization/organization.controller";
import { UserController } from "./user/user.controller";
import { OrganizationModule } from "libs/shared/organization/organization.module";
import { OrganizationService } from "libs/shared/organization/src/organization/organization.service";
import { UserService } from "libs/shared/user/src/user/user.service";
import { OrganizationEntity } from "libs/shared/entities/api/organization.entity";
import { OrganizationTypeRoleEntity } from "libs/shared/entities/api/organization.type.role.entity";
import { DataSource } from "typeorm";

@Module({
  imports: [
    CoreModule,
    SharedModule,
    TypeOrmModule.forFeature([
      RoleEntity,
      OrganizationTypeRoleEntity,
      UserEntity,
      OrganizationEntity,
      OrganizationTypeEntity,
    ]),
  ],
  controllers: [ApiServiceController, OrganizationController, UserController],
  providers: [ApiServiceService, OrganizationService, UserService],
})
export class ApiServiceModule {
  constructor(private readonly connection: DataSource) {
    connection.runMigrations();
  }
}
