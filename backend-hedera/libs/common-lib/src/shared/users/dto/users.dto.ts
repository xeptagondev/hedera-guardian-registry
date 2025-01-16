import { OrganisationDto } from '../../organization/dto/organisation.dto';
import { RoleDTO } from '../../role/dto/role.dto';
import { RoleEnum } from '../../role/enum/role.enum';

export class UsersDTO {
    id: number;
    email: string;
    username: string;
    name: string;
    hederaAccount: string;
    hederaKey: string;
    password: string;
    role: RoleDTO | RoleEnum;
    company: OrganisationDto;
}
