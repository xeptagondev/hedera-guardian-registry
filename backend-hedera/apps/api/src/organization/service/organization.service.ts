import { OrganisationDto } from '@app/api-lib/shared/dto/organisation.dto';
import { QueryDto } from '@app/api-lib/shared/dto/query.dto';
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
