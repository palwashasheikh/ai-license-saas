
import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateLicenseDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(2)
  vendor!: string;

  @IsString()
  @MinLength(3)
  licenseKey!: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsIn(['active', 'expired', 'revoked'])
  status?: string;
}
