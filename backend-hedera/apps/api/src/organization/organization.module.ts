import { Module } from '@nestjs/common';
import { OrganizationService } from './service/organization.service';
import { OrganizationController } from './controller/organization.controller';
import { UserService } from '../user/service/user.service';

@Module({
    controllers: [OrganizationController],
    exports: [OrganizationService],
    providers: [OrganizationService],
})
export class OrganizationModule {}
