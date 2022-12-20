import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegistrosService } from './registros.service';

import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import { Registro } from './entities/registro.entity';

@ApiTags('Registros')
@Controller('registros')
export class RegistrosController {
  constructor(private readonly registrosService: RegistrosService) {}

  @Get('promedio')
  @ApiResponse({ status: 200, description: 'Total de km'})
  promedio() {
    return this.registrosService.promedio();
  }

  @Get('total')
  @ApiResponse({ status: 200, description: 'Total de km'})
  kmTotales() {
    return this.registrosService.kmTotales();
  }

  @Get('cantStation')
  @ApiResponse({ status: 200, description: 'Total de veces que cargue nafta'})
  cantStation() {
    return this.registrosService.cantStation();
  }

  @Get('plataTotal')
  @ApiResponse({ status: 200, description: 'Total de plata invertida en nafta'})
  plataTotal() {
    return this.registrosService.plataTotal();
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Registros obtenidos con éxito'})
  @ApiResponse({ status: 400, description: 'Bad request'})
  findAll() {
    return this.registrosService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Registro obtenidos con éxito', type: Registro})
  @ApiResponse({ status: 404, description: 'Not found'})
  findOne(@Param('id' ) id: number) {
    return this.registrosService.findOne( id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Registro creado con éxito', type: Registro})
  @ApiResponse({ status: 400, description: 'Bad request'})
  create(@Body() createRegistroDto: CreateRegistroDto) {
    return this.registrosService.create(createRegistroDto);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Registro editado con éxito'})
  @ApiResponse({ status: 404, description: 'Not found'})
  update(@Param('id') id: number, @Body() updateRegistroDto: UpdateRegistroDto) {
    return this.registrosService.update( id, updateRegistroDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Registro eliminado con éxito'})
  @ApiResponse({ status: 404, description: 'Not found'})
  remove(@Param('id') id: number) {
    return this.registrosService.remove( id );
  }

}
