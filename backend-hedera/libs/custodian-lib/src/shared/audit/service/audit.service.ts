import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuditEntity } from '../entity/audit.entity';
import { AuditDTO } from '../audit.dto';

@Injectable()
export class AuditService {
    constructor(private readonly auditRepository: Repository<AuditEntity>) {}

    async save(dto: AuditDTO) {
        const entity: AuditEntity = {
            logLevel: dto.logLevel,
            message: dto.message,
        };

        await this.auditRepository.save(entity);
    }
}
