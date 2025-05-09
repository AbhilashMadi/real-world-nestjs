import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleController } from '~/article/article.controller';
import { ArticleService } from '~/article/article.service';
import { ArticleEntity } from '~/article/article.entity';
import { UserEntity } from '~/user/user.entity';
import { TagEntity } from '~/tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity, TagEntity])],
  exports: [ArticleService],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
