import { OrganisationDto } from '../../organization/dto/organisation.dto';
import { CompanyRoleEnum } from '../../organization/enum/company.role.enum';
import { RoleDTO } from '../../role/dto/role.dto';
import { RoleEnum } from '../../role/enum/role.enum';

export class UsersDTO {
    id: number;
    email: string;
    username: string;
    name: string;
    group: string;
    refreshToken: string;
    hederaAccount: string;
    hederaKey: string;
    password: string;
    companyRole: CompanyRoleEnum;
    role: RoleDTO | RoleEnum;
    company: OrganisationDto;
}
