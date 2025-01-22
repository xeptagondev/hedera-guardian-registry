import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { AuditModule } from '@app/custodian-lib/shared/audit/audit.module';
import { UtilModule } from '@app/custodian-lib/shared/util/util.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '@app/custodian-lib/shared/users/entity/users.entity';
import { OrganizationEntity } from '@app/custodian-lib/shared/organization/entity/organization.entity';
import { UsersModule } from '@app/common-lib/shared/users/users.module';
import { OrganizationTypeModule } from '@app/custodian-lib/shared/organization-type/organization-type.module';
import { RoleModule } from '@app/common-lib/shared/role/role.module';
import { GuardianRoleModule } from '@app/custodian-lib/shared/guardian-role/guardian-role.module';
import { GuardianRoleEntity } from '@app/custodian-lib/shared/guardian-role/entity/guardian-role.entity';
import { RoleEntity } from '@app/custodian-lib/shared/role/entity/role.entity';
import { OrganizationTypeEntity } from '@app/custodian-lib/shared/organization-type/entity/organization-type.entity';

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [
        TypeOrmModule.forFeature([
            UsersEntity,
            OrganizationEntity,
            GuardianRoleEntity,
            RoleEntity,
            OrganizationTypeEntity,
        ]),
        AuditModule,
        UtilModule,
        UsersModule,
        OrganizationTypeModule,
        RoleModule,
        GuardianRoleModule,
    ],
    exports: [UserService],
})
export class UserModule {}
