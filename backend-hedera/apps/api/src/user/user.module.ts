import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { OrganizationModule } from '../organization/organization.module';
import { OrganizationService } from '../organization/service/organization.service';

@Module({
    imports: [OrganizationModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
