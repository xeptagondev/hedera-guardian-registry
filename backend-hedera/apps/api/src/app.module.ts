import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { CoreModule } from '@app/api-lib/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '@app/custodian-lib/core/app-config/orm-config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                ormConfig(configService),
        }),
        UserModule,
        OrganizationModule,
        CoreModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
