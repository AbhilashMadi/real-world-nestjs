import { IsOptional, IsString, IsArray, ArrayUnique } from 'class-validator';
import { Type } from 'class-transformer';

export default class UpdateArticleDto {
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Body must be a string' })
  body?: string;

  @IsOptional()
  @IsArray({ message: 'tagList must be an array of strings' })
  @ArrayUnique({ message: 'tagList should not contain duplicate tags' })
  @IsString({ each: true, message: 'Each tag must be a string' })
  @Type(() => String)
  tagList?: string[];
}
