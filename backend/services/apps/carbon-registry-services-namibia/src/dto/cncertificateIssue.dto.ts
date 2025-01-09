import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class CNCertificateIssueDto {

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  documentId: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  approve: boolean;

  @ValidateIf(c => c.scope)
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  scope: string;

  // this field contains the remark in the reject scenario
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  orgBoundary: string;

  @ValidateIf(c => c.year)
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  year: number;

  @ValidateIf(c => c.assessmentPeriodStart)
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  assessmentPeriodStart: number;

  @ValidateIf(c => c.assessmentPeriodEnd)
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  assessmentPeriodEnd: number;
}
