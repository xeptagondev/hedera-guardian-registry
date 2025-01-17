import { Module } from '@nestjs/common';
import { AuditService } from './service/audit.service';

@Module({
    providers: [AuditService],
    exports: [AuditService],
})
export class AuditModule {}
