import { OrganizationRegisterDto } from '@app/api-lib/shared/dto/organization.register.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationService {
    register(organizationRegisterDto: OrganizationRegisterDto, req: any): any {
        throw new Error('Method not implemented.');
    }
    query(organizationRegisterDto: OrganizationRegisterDto, req: any): any {
        throw new Error('Method not implemented.');
    }
}
