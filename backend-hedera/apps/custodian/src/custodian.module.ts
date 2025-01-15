import { Module } from '@nestjs/common';
import { CustodianController } from './custodian.controller';
import { CustodianService } from './custodian.service';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { CoreModule } from '@app/custodian-lib/core/core.module';

@Module({
    imports: [OrganizationModule, UserModule, CoreModule],
    controllers: [CustodianController],
    providers: [CustodianService],
})
export class CustodianModule {}
