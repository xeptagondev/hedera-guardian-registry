import { RoleEnum } from '@app/common-lib/shared/role/enum/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNotEmptyObject,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { OrganisationDto } from './organisation.dto';

export class UserDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty({ enum: RoleEnum })
    @IsEnum(RoleEnum, {
        message:
            'Invalid role. Supported following roles:' +
            Object.values(RoleEnum),
    })
    role: RoleEnum;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsOptional()
    phoneNo: string;

    @IsNotEmptyObject()
    @ApiPropertyOptional()
    @IsOptional()
    @ValidateNested()
    @Type(() => OrganisationDto)
    organization: OrganisationDto;

    @IsNumber()
    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsOptional()
    organizationId: number;

    password: string;

    apiKey?: string;
}
