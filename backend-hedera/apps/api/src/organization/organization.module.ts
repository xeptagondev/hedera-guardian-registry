import { Module } from '@nestjs/common';
import { OrganizationService } from './service/organization.service';

@Module({
  providers: [OrganizationService]
})
export class OrganizationModule {}
