import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get('/redis-info')
  getRedisInfo() {
    return `${this.configService.get('redis.host')}:${this.configService.get('redis.port')}`;
  }

  @Get('/expand-variable')
  getExpandVariable() {
    return `${this.configService.get('TEST3')}`;
  }
}
