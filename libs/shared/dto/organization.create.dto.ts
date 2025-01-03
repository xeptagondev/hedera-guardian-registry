import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmpty,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from "class-validator";

export class OrganizationCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
