import { AuditEntity } from '@app/custodian-lib/shared/audit/entity/audit.entity';
import { GuardianRoleEntity } from '@app/custodian-lib/shared/guardian-role/entity/guardian-role.entity';
import { OrganizationTypeEntity } from '@app/custodian-lib/shared/organization-type/entity/organization-type.entity';
import { OrganizationEntity } from '@app/custodian-lib/shared/organization/entity/organization.entity';
import { RoleEntity } from '@app/custodian-lib/shared/role/entity/role.entity';
import { UsersEntity } from '@app/custodian-lib/shared/users/entity/users.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    autoLoadEntities: true,
    // entities: [
    //     UsersEntity,
    //     OrganizationEntity,
    //     OrganizationTypeEntity,
    //     GuardianRoleEntity,
    //     RoleEntity,
    //     AuditEntity,
    // ],
    ssl:
        process.env.APP_ENV && process.env.APP_ENV != 'dev'
            ? {
                  rejectUnauthorized: false,
              }
            : false,
};

export default ormConfig;
