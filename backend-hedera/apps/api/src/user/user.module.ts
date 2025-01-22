import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '@app/custodian-lib/shared/users/entity/users.entity';
import { OrganizationEntity } from '@app/custodian-lib/shared/organization/entity/organization.entity';
import { OrganizationModule } from '../organization/organization.module';
import { JwtModule } from '@nestjs/jwt';
import { OrganizationTypeEntity } from '@app/custodian-lib/shared/organization-type/entity/organization-type.entity';
import { GuardianRoleEntity } from '@app/custodian-lib/shared/guardian-role/entity/guardian-role.entity';
import { RoleEntity } from '@app/custodian-lib/shared/role/entity/role.entity';
import { UtilModule } from '@app/api-lib/shared/util/util.module';

@Module({
    imports: [
        JwtModule,
        OrganizationModule,
        UtilModule,
        TypeOrmModule.forFeature([
            UsersEntity,
            OrganizationEntity,
            OrganizationTypeEntity,
            GuardianRoleEntity,
            RoleEntity,
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
