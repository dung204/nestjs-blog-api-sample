import { IsName } from '@/common/decorators/is-name.decorator';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;

  @IsName()
  firstName!: string;

  @IsName()
  lastName!: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
