import { Module } from '@nestjs/common';
import { OrganizationService } from './service/organization.service';
import { OrganizationController } from './controller/organization.controller';
import { AuditModule } from '@app/custodian-lib/shared/audit/audit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '@app/custodian-lib/shared/organization/entity/organization.entity';
import { OrganizationTypeEntity } from '@app/custodian-lib/shared/organization-type/entity/organization-type.entity';
import { RoleEntity } from '@app/custodian-lib/shared/role/entity/role.entity';
import { GuardianRoleEntity } from '@app/custodian-lib/shared/guardian-role/entity/guardian-role.entity';
import { UsersEntity } from '@app/custodian-lib/shared/users/entity/users.entity';

@Module({
    providers: [OrganizationService],
    controllers: [OrganizationController],
    imports: [
        TypeOrmModule.forFeature([
            OrganizationEntity,
            UsersEntity,
            OrganizationTypeEntity,
            GuardianRoleEntity,
            RoleEntity,
        ]),
        AuditModule,
    ],
})
export class OrganizationModule {}
