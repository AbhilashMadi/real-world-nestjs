import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
} from 'class-validator';
import RegexPatterns from '~/utils/regex';

export default class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email?: string;

  @IsOptional()
  @Matches(RegexPatterns.PASSWORD_REGEX_PATTERN)
  readonly password?: string;

  @IsOptional()
  @Matches(RegexPatterns.USERNAME_REGEX_PATTERN)
  readonly username?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Bio must be at most 200 characters' })
  readonly bio?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Image must be a valid URL' })
  readonly image?: string;
}
