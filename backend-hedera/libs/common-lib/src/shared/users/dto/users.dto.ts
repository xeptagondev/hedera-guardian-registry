import { OrganisationDto } from '../../organization/dto/organisation.dto';
import { OrganizationTypeEnum } from '../../organization-type/enum/organization-type.enum';
import { RoleEnum } from '../../role/enum/role.enum';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { SuperDTO } from '@app/common-lib/core/dto/super.dto';
import { UsersEntity } from '@app/custodian-lib/shared/users/entity/users.entity';
import { Unwrap } from '@app/common-lib/core/util/unwrappable';
import { JWTPayload } from '../../login/dto/jwt.payload.dto';

export class UsersDTO extends SuperDTO<UsersEntity> {
    id: number;

    @Unwrap()
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim().toLowerCase() : value,
    )
    email: string;

    @Unwrap()
    name: string;
    @Unwrap()
    phoneNumber?: string;
    hederaAccount: string;
    hederaKey: string;
    password: string;
    role: RoleEnum;
    @Unwrap({ name: 'organization' })
    company: OrganisationDto;
    request: JWTPayload;
}
