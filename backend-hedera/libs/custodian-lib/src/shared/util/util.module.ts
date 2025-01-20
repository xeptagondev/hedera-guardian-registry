import { Module } from '@nestjs/common';
import { SuperService } from './service/super.service';
import { AuditModule } from '../audit/audit.module';
import { UtilService } from './service/util.service';

@Module({
    providers: [SuperService, UtilService],
    imports: [AuditModule],
})
export class UtilModule {}
