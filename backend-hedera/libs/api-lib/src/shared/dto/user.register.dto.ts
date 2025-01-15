import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEmpty,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
} from 'class-validator';

export class UserRegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}
