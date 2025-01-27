import { OrganisationDto } from '../../organization/dto/organisation.dto';
import { OrganizationTypeEnum } from '../../organization-type/enum/organization-type.enum';
import { RoleEnum } from '../../role/enum/role.enum';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { JWTPayload } from '../../login/dto/jwt.payload.dto';

export class UsersDTO {
    id: number;

    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim().toLowerCase() : value,
    )
    email: string;

    name: string;
    phoneNumber?: string;
    hederaAccount: string;
    hederaKey: string;
    password: string;
    role: RoleEnum;
    company: OrganisationDto;
    request: JWTPayload;
}
