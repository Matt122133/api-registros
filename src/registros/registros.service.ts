import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { CreateRegistroDto, UpdateRegistroDto } from './dto';

import { Registro } from './entities/registro.entity';

@Injectable()
export class RegistrosService {

  private readonly logger = new Logger('ProductsService');

  constructor(

    @InjectRepository(Registro)
    private readonly registrosRepository: Repository<Registro>

  ) {}

  // función auxiliar que me trae los registros que se les puso nafta ese dia
  async auxFunction() {
    const registros = await this.registrosRepository.find();

    const registrosDistNo = registros.map(reg => reg.station !== 'No');

    const arrRet = [];

    for ( let i = 0; i < registrosDistNo.length; i++){
      if(registrosDistNo[i]) arrRet.push(registros[i]);
    }
    return arrRet;
  }

  async create( createRegistroDto: CreateRegistroDto ) {

    try {

      const registro = this.registrosRepository.create( createRegistroDto );

      await this.registrosRepository.save( registro );

      return registro;

    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async findAll() {

    const registros = await this.registrosRepository.find()

    //ordenar los registros mediante su km, el mas chico al inicio y el mas grande al final
    registros.sort((a,b)=> a.km - b.km);
    return registros;

  }

  async findOne(id: number) {

      const registro = await this.registrosRepository.findOne({ where: { id }});

      if ( !registro ) throw new NotFoundException(`No se encontró el registro con id: ${id} `);

      return registro;

  }

  async update(id: number, updateRegistroDto: UpdateRegistroDto) {

    const registro = await this.registrosRepository.findOne({ where: { id } });

    if ( !registro ) throw new NotFoundException('No se encontró el registro a editar');

    if ( updateRegistroDto.day ) registro.day = updateRegistroDto.day;
    if ( updateRegistroDto.km ) registro.km = updateRegistroDto.km;

    await this.registrosRepository.save(registro);

    return `El registro con id ${ id } se edito correctamente`;

  }

  async remove(id: number) {

      const registro = await this.registrosRepository.findOne({ where: { id }});

      if ( !registro ) throw new NotFoundException('No se encontró el registro a eliminar');

      await this.registrosRepository.remove(registro);
      return `Registro con id ${ id } eliminado con éxito`

  }

  async kmTotales() {

    const registros = await this.registrosRepository.find();

    //ordenar los registros mediante su km, el mas chico al inicio y el mas grande al final
    registros.sort((a,b)=> a.km - b.km);

    if ( registros[0] === null ) throw new NotFoundException('No hay registros en la DB');

    const primerRegistro = registros[0];

    const ultimoRegistro = registros[registros.length - 1 ];

    return `La cantidad de km hechos son: ${(ultimoRegistro.km-primerRegistro.km).toFixed(1)}`;

  }

  async cantStation() {

    const arrRet = await this.auxFunction();

    return `La cantidad de veces que pusiste nafta son: ${arrRet.length}`;

  }

  async plataTotal() {
    const arrRet = await this.auxFunction();

    let suma = 0;

    arrRet.forEach( reg => {
      const ret = reg.station;
      const a = ret.split("$");
      suma += Number(a[1].split("(", 1));
    })

    return `Has puesto $${suma} en nafta`;
  }

  private handleDBExceptions ( error: any ) {

    if ( error.code === '23505' ) throw new BadRequestException( error.detail );

    this.logger.error( error );
    throw new InternalServerErrorException('Unexpected error, check the server logs');

  }

  async deleteAllRegistros() {
    const query = this.registrosRepository.createQueryBuilder( 'registro' );

    try {

      return await query.delete().where({}).execute();

    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

}
