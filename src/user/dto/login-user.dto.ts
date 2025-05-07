import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import RegexPatterns from '~/utils/regex';

export default class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegexPatterns.PASSWORD_REGEX_PATTERN)
  password: string;
}
