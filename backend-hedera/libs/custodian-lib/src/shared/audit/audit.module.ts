import { Module } from '@nestjs/common';
import { AuditService } from './service/audit.service';
import { AuditEntity } from './entity/audit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers: [AuditService],
    exports: [AuditService],
    imports: [TypeOrmModule.forFeature([AuditEntity])],
})
export class AuditModule {}
