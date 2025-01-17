import { Module } from '@nestjs/common';
import { AuditService } from './service/audit.service';

@Module({
  providers: [AuditService]
})
export class AuditModule {}
