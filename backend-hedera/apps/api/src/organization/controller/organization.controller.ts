import { Controller, Post, Body, Request } from '@nestjs/common';
import { OrganizationService } from '../service/organization.service';
import { OrganisationDto } from '@app/common-lib/shared/organization/dto/organisation.dto';
import { QueryDto } from '@app/common-lib/shared/query/dto/query.dto';

@Controller('organization')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}
    @Post('register')
    async register(
        @Body() organisationDto: OrganisationDto,
        @Request() req,
    ): Promise<any> {
        return this.organizationService.register(organisationDto, req);
    }

    @Post('query')
    async query(@Body() queryDto: QueryDto, @Request() req): Promise<any> {
        return this.organizationService.query(queryDto, req);
    }
}
