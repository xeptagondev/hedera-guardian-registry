import { OrganisationDto } from '@app/common-lib/shared/organization/dto/organisation.dto';
import { QueryDto } from '@app/common-lib/shared/query/dto/query.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationService {
    register(organisationDto: OrganisationDto, req: any): any {
        throw new Error('Method not implemented.');
    }
    query(queryDto: QueryDto, req: any): any {
        throw new Error('Method not implemented.');
    }
}
