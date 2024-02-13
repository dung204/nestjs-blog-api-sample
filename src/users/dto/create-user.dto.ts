import { IsName } from '@/common/decorators/is-name.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'acezombiev4@gmail.com',
    description: 'The email of User',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Password@123',
    description:
      'The password of User (min 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character)',
  })
  @IsStrongPassword()
  password!: string;

  @ApiProperty({
    example: 'Dung',
    description: 'The first name of User (Unicode letters only)',
  })
  @IsName()
  firstName!: string;

  @ApiProperty({
    example: 'Ho',
    description: 'The last name of User (Unicode letters only)',
  })
  @IsName()
  lastName!: string;

  @ApiPropertyOptional({
    example: 'Hanoi',
    description: 'The address of User (optional)',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: 'https://www.example.com/avatar.png',
    description: 'The avatar URL of User (optional)',
  })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
