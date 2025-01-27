import { OrganisationDto } from '../../organization/dto/organisation.dto';
import { OrganizationTypeEnum } from '../../organization-type/enum/organization-type.enum';
import { RoleEnum } from '../../role/enum/role.enum';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { SuperDTO } from '@app/common-lib/core/dto/super.dto';
import { UsersEntity } from '@app/custodian-lib/shared/users/entity/users.entity';
import { Unwrap } from '@app/common-lib/core/util/unwrappable';

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
    group: string;
    refreshToken: string;
    @Unwrap()
    hederaAccount: string;
    hederaKey: string;
    password: string;
    companyRole: OrganizationTypeEnum;
    role: RoleEnum;
    @Unwrap({ name: 'organization' })
    company: OrganisationDto;
}
