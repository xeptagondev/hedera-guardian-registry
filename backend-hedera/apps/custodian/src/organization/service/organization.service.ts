import { SuperService } from '@app/common-lib/core/service/super.service';
import { OrganisationDto } from '@app/common-lib/shared/organization/dto/organisation.dto';
import { AuditService } from '@app/custodian-lib/shared/audit/service/audit.service';
import { OrganizationEntity } from '@app/custodian-lib/shared/organization/entity/organization.entity';
// import { SuperService } from '@app/custodian-lib/shared/util/service/super.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService extends SuperService<
    OrganizationEntity,
    OrganisationDto
> {
    constructor(
        protected readonly auditService: AuditService,
        @InjectRepository(OrganizationEntity)
        protected readonly organizationRepository: Repository<OrganizationEntity>,
    ) {
        super(organizationRepository);
    }
}
