import {
    Controller,
    Post,
    Body,
    Request,
    Put,
    Param,
    UseGuards,
} from '@nestjs/common';
import { OrganizationService } from '../service/organization.service';
import { OrganisationDto } from '@app/common-lib/shared/organization/dto/organisation.dto';
import { QueryDto } from '@app/common-lib/shared/query/dto/query.dto';
import { OrganisationApproveDto } from '@app/common-lib/shared/organization/dto/approve.dto';
import { DataListResponseDto } from '@app/common-lib/shared/response/dto/data.list.response.dto';
import { AuthGuardService } from '@app/api-lib/core/auth-guards/auth-guard.service';

@Controller('organisation')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}
    @Post('register')
    async register(
        @Body() organisationDto: OrganisationDto,
        @Request() req,
    ): Promise<any> {
        return this.organizationService.register(organisationDto, req);
    }
    @Put('approve/:id')
    async approve(
        @Param('id') id: string,
        @Body() organizationApproveDto: OrganisationApproveDto,
    ): Promise<any> {
        return this.organizationService.approve(id, organizationApproveDto);
    }

    @UseGuards(AuthGuardService)
    @Post('query')
    async query(
        @Body() queryDto: QueryDto,
        @Request() req,
    ): Promise<DataListResponseDto> {
        return this.organizationService.query(queryDto, req.user);
    }
}
