import { Module } from '@nestjs/common';
import { CustodianController } from './custodian.controller';
import { CustodianService } from './custodian.service';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { CoreModule } from '@app/custodian-lib/core/core.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '@app/custodian-lib/core/app-config/orm-config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.custodian' }),
        TypeOrmModule.forRoot(ormConfig),
        OrganizationModule,
        UserModule,
        CoreModule,
    ],
    controllers: [CustodianController],
    providers: [CustodianService],
})
export class CustodianModule {}
