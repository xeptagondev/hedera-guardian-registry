import { OrganisationApproveDto } from '@app/common-lib/shared/organization/dto/approve.dto';
import { OrganisationDto } from '@app/common-lib/shared/organization/dto/organisation.dto';
import { QueryDto } from '@app/common-lib/shared/query/dto/query.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class OrganizationService {
    constructor(private readonly configService: ConfigService) {}
    async approve(id: string, organizationApproveDto: OrganisationApproveDto) {
        try {
            const response = await axios.put(
                `${this.configService.get('url')}/organization/approve/${id}`,
                organizationApproveDto,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    register(organisationDto: OrganisationDto, req: any): any {
        throw new Error('Method not implemented.');
    }
    query(queryDto: QueryDto, req: any): any {
        throw new Error('Method not implemented.');
    }
}
