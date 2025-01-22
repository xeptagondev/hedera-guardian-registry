import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from './jwt.config.service';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: '.env.custodian',
        }),
        JwtModule.registerAsync({
            useClass: JwtConfigService,
        }),
    ],
})
export class AppConfigModule {}
