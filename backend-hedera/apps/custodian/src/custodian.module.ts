import { Module } from '@nestjs/common';
import { CustodianController } from './custodian.controller';
import { CustodianService } from './custodian.service';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { CoreModule } from '@app/custodian-lib/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '@app/custodian-lib/core/app-config/orm-config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                ormConfig(configService),
        }),
        OrganizationModule,
        UserModule,
        CoreModule,
    ],
    controllers: [CustodianController],
    providers: [CustodianService],
})
export class CustodianModule {
    constructor(private readonly connection: DataSource) {
        this.connection.runMigrations();
    }
}
