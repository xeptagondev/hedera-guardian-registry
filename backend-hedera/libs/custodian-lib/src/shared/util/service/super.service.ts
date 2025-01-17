import { Injectable } from '@nestjs/common';
import { AuditService } from '../../audit/service/audit.service';

@Injectable()
export class SuperService {
    constructor(protected readonly auditService: AuditService) {}
}
