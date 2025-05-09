import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from '~/article/article.service';
import { AuthGuard } from '~/user/guards/auth.guard';
import { User } from '~/user/decorators/user.decorator';
import { UserEntity } from '~/user/user.entity';
import NewArticleDto from '~/article/dto/new-article.dto';

@Controller('articles')
@UseGuards(AuthGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  async createArticle(
    @Body('article') newArticleDto: NewArticleDto,
    @User() user: UserEntity,
  ) {
    const article = await this.articleService.createArticle(
      newArticleDto,
      user,
    );

    return this.articleService.buildResponse(article);
  }

  @Put()
  async updateArticle() {
    return 'update article';
  }

  @Delete('/:slug')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArticle(@Param('slug') slug: string): Promise<void> {
    await this.articleService.deleteArticle(slug);
  }
}
