import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ArrayUnique,
} from 'class-validator';
import { Type } from 'class-transformer';

export default class NewArticleDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  readonly title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  readonly description: string;

  @IsString()
  @IsNotEmpty({ message: 'Body is required' })
  readonly body: string;

  @IsOptional()
  @IsArray({ message: 'tagList must be an array of strings' })
  @ArrayUnique({ message: 'tagList should not contain duplicate tags' })
  @IsString({ each: true, message: 'Each tag must be a string' })
  @Type(() => String)
  readonly tagList?: string[];
}
