import { OrganizationRegisterDto } from '@app/api-lib/shared/dto/organization.register.dto';
import { Controller, Post, Body, Request } from '@nestjs/common';
import { OrganizationService } from '../service/organization.service';

@Controller('organization')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}
    @Post('register')
    async register(
        @Body() organizationRegisterDto: OrganizationRegisterDto,
        @Request() req,
    ): Promise<any> {
        return this.organizationService.register(organizationRegisterDto, req);
    }

    @Post('query')
    async query(
        @Body() organizationRegisterDto: OrganizationRegisterDto,
        @Request() req,
    ): Promise<any> {
        return this.organizationService.query(organizationRegisterDto, req);
    }
}
