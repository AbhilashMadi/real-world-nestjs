import { Controller, Get } from '@nestjs/common';

import { TagService } from '~/tag/tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagsService: TagService) {}

  @Get()
  async getAllTags(): Promise<{ tags: string[] }> {
    const data = await this.tagsService.findAllTags();
    return { tags: data.map((o) => o.name) };
  }
}
