import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import RegexPatterns from '~/utils/regex';

export default class CreateUserDto {
  @IsNotEmpty()
  @Matches(RegexPatterns.USERNAME_REGEX_PATTERN)
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Matches(RegexPatterns.PASSWORD_REGEX_PATTERN)
  readonly password: string;
}
