import { Module } from '@nestjs/common';
import { RegistrosService } from './registros.service';
import { RegistrosController } from './registros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Registro } from './entities/registro.entity';

@Module({
  controllers: [RegistrosController],
  providers: [RegistrosService],
  imports: [
    TypeOrmModule.forFeature([ Registro ])
  ],
  exports: [

    RegistrosService,
    TypeOrmModule,

  ]
})
export class RegistrosModule {}
