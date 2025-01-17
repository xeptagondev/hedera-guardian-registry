import { Injectable } from '@nestjs/common';
import { AuditService } from '../../audit/service/audit.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SuperService {
    constructor(
        protected readonly auditService: AuditService,
        protected readonly configService: ConfigService,
    ) {}
}
