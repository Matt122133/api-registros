import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RegistrosModule } from '../registros/registros.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [

    RegistrosModule,

  ]
})
export class SeedModule {}
