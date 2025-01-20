import { OrganisationDto } from '../../organization/dto/organisation.dto';
import { OrganizationTypeEnum } from '../../organization-type/enum/organization-type.enum';
import { RoleEnum } from '../../role/enum/role.enum';

export class UsersDTO {
    id: number;
    email: string;
    username: string;
    name: string;
    phoneNumber?: string;
    group: string;
    refreshToken: string;
    hederaAccount: string;
    hederaKey: string;
    password: string;
    companyRole: OrganizationTypeEnum;
    role: RoleEnum;
    company: OrganisationDto;
}
