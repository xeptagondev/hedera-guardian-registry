import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/controller/user.controller';
import { OrganizationController } from './organization/controller/organization.controller';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
    imports: [UserModule, OrganizationModule],
    controllers: [AppController, UserController, OrganizationController],
    providers: [AppService],
})
export class AppModule {}
