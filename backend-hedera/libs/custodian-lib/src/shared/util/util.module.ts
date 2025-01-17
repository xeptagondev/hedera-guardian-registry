import { Module } from '@nestjs/common';
import { SuperService } from './service/super.service';
import { AuditModule } from '../audit/audit.module';

@Module({
    providers: [SuperService],
    imports: [AuditModule],
})
export class UtilModule {}
