import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuditEntity } from '../entity/audit.entity';
import { AuditDTO } from '../dto/audit.dto';

@Injectable()
export class AuditService {
    constructor() {}

    async save(dto: AuditDTO) {
        // const entity: AuditEntity = {
        //     logLevel: dto.logLevel,
        //     createdTime: dto.createdTime,
        //     data: dto.data,
        // };
        // await this.auditRepository.save(entity);
    }
}
