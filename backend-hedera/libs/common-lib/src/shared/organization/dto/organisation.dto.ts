import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    ArrayMinSize,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    MaxLength,
    ValidateIf,
} from 'class-validator';
import { CompanyRoleEnum } from '../enum/company.role.enum';

export class OrganisationDto {
    name: string;
    companyRole: CompanyRoleEnum;
}
