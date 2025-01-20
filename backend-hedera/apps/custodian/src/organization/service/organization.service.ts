import { AuditService } from '@app/custodian-lib/shared/audit/service/audit.service';
import { OrganizationEntity } from '@app/custodian-lib/shared/organization/entity/organization.entity';
import { SuperService } from '@app/custodian-lib/shared/util/service/super.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService extends SuperService {
    constructor(
        protected readonly auditService: AuditService,
        @InjectRepository(OrganizationEntity)
        private readonly organizationRepository: Repository<OrganizationEntity>,
    ) {
        super(auditService);
    }
}
