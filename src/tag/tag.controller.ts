import { TagService } from './tag.service';
import { Controller, Get } from '@nestjs/common';
import { TagEntity } from './tag.entity';

@Controller()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('api/tags')
  // async findAll(): Promise<TagEntity[]> {
  async findAll(): Promise<{ tags: string[] }> {
    const tags = await this.tagService.findAll();
    // transformar e preprar data, neste caso remover o campo id
    return {
      tags: tags.map((tag) => tag.name),
    };
  }
}
