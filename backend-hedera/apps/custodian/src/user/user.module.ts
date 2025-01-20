import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { AuditModule } from '@app/custodian-lib/shared/audit/audit.module';
import { UtilModule } from '@app/custodian-lib/shared/util/util.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardianRoleEntity } from '@app/custodian-lib/shared/guardian-role/entity/guardian-role.entity';

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [
        AuditModule,
        UtilModule,
        TypeOrmModule.forFeature([GuardianRoleEntity]),
    ],
})
export class UserModule {}
