import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}


  @Get()
  @ApiResponse({ status: 200, description: 'Se ejecuta la población de la DB'})
  executeSeed() {
    return this.seedService.runSeed();
  }

}
