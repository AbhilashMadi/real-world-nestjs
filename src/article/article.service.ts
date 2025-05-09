import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArticleEntity } from '~/article/article.entity';
import { TagEntity } from '~/tag/tag.entity';
import { UserEntity } from '~/user/user.entity';
import NewArticleDto from '~/article/dto/new-article.dto';
import IArticleResponse from '~/types/article-response.interface';
import UpdateArticleDto from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(TagEntity)
    private readonly tagsRepository: Repository<TagEntity>,
  ) {}

  async createArticle(
    dto: NewArticleDto,
    author: UserEntity,
  ): Promise<ArticleEntity> {
    const { title, description, body, tagList = [] } = dto;

    // Generate slug
    const slugBase = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    let slug = slugBase;
    let suffix = 1;
    while (await this.articleRepository.findOne({ where: { slug } })) {
      slug = `${slugBase}-${suffix++}`;
    }

    // Ensure tags exist or create them
    const tags: TagEntity[] = [];
    for (const tag of tagList) {
      let tagEntity = await this.tagsRepository.findOne({
        where: { name: tag },
      });

      if (!tagEntity) {
        tagEntity = this.tagsRepository.create({ name: tag });
        await this.tagsRepository.save(tagEntity);
      }

      tags.push(tagEntity);
    }

    const article = this.articleRepository.create({
      title,
      description,
      body,
      slug,
      tags,
      author,
    });

    return await this.articleRepository.save(article);
  }

  async deleteArticle(slug: string): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({ where: { slug } });

    if (!article) {
      throw new NotFoundException(`Article with slug '${slug}' not found.`);
    }

    return await this.articleRepository.remove(article);
  }

  async updateArticle(
    slug: string,
    dto: UpdateArticleDto,
    user: UserEntity,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({
      where: { slug },
      relations: ['author'],
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.author.id !== user.id) {
      throw new ForbiddenException('You are not the author of this article');
    }

    Object.assign(article, dto);
    return await this.articleRepository.save(article);
  }

  buildResponse(article: ArticleEntity): IArticleResponse {
    return {
      article: {
        slug: article.slug,
        title: article.title,
        description: article.description,
        body: article.body,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        favorited: article.favorited,
        favoritesCount: article.favoritesCount,
        tagList: article.tags.map((o) => o.name),
        author: {
          username: article.author.username,
          bio: article.author.bio,
          image: article.author.image,
          following: false,
        },
      },
    };
  }
}
