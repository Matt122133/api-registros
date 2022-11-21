import { Injectable } from '@nestjs/common';
import { RegistrosService } from '../registros/registros.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(

    private readonly registroService: RegistrosService

  ) {}

  async runSeed() {

    await this.deleteTables();

    await this.insertRegistros();

    return `SEED EXECUTED`;
  }

  private async deleteTables() {
    await this.registroService.deleteAllRegistros();
  }

  private async insertRegistros() {
    const registros = initialData.registros;

    const insertPromises = [];

    for(let i = 0; i < registros.length; i++){
      insertPromises.push( this.registroService.create( registros[i] ));
    }

    await Promise.all( insertPromises );

    return true;
  }

}
