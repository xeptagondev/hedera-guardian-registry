import { Module } from '@nestjs/common';
import { SuperService } from './service/super.service';
import { AuditModule } from '../audit/audit.module';
import { UtilService } from './service/util.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolicyBlocksEntity } from '../policy-blocks/entity/policy-blocks.entity';

@Module({
    providers: [SuperService, UtilService],
    imports: [TypeOrmModule.forFeature([PolicyBlocksEntity]), AuditModule],
    exports: [UtilService],
})
export class UtilModule {}
