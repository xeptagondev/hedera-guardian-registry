import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import configuration from "./configuration";
import { PopulateApiService1736147567619 } from "libs/shared/migrations/1736147567619-PopulateApiService";
import { RoleEntity } from "libs/shared/entities/api/role.entity";
import { OrganizationTypeRoleEntity } from "libs/shared/entities/api/organization.type.role.entity";
import { UserEntity } from "libs/shared/entities/api/user.entity";
import { OrganizationEntity } from "libs/shared/entities/api/organization.entity";
import { OrganizationTypeEntity } from "libs/shared/entities/api/organization.type.entity";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          ...configService.get("database"),
          entities: [
            RoleEntity,
            OrganizationTypeRoleEntity,
            UserEntity,
            OrganizationEntity,
            OrganizationTypeEntity,
          ],
          migrations: [PopulateApiService1736147567619],
          migrationsRun: false,
          migrationsTableName: "typeorm_migrations_entity",
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppConfigModule {}
