import { Module } from '@nestjs/common';
import { OrganizationService } from './service/organization.service';
import { OrganizationController } from './controller/organization.controller';
import { UtilModule } from '@app/api-lib/shared/util/util.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '@app/custodian-lib/shared/organization/entity/organization.entity';
import { OrganizationTypeEntity } from '@app/custodian-lib/shared/organization-type/entity/organization-type.entity';
import { JwtModule } from '@nestjs/jwt';
import { RoleEntity } from '@app/custodian-lib/shared/role/entity/role.entity';

@Module({
    imports: [
        JwtModule,
        UtilModule,
        TypeOrmModule.forFeature([
            OrganizationEntity,
            OrganizationTypeEntity,
            RoleEntity,
        ]),
    ],
    controllers: [OrganizationController],
    exports: [OrganizationService],
    providers: [OrganizationService],
})
export class OrganizationModule {}
