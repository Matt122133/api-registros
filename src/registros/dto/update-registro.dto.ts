// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

import { CreateRegistroDto } from './create-registro.dto';

export class UpdateRegistroDto extends PartialType(CreateRegistroDto) {

    @ApiProperty({
        description: 'El dia del registro (único)',
    })
    @IsString()
    @IsOptional()
    day: string;

    @ApiProperty({
        description: 'Los km del dia de este registro'
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    km: number;

    @ApiProperty({
        description: 'Que se hizo en este dia',
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        description: 'Si se fue la estación o no',
    })
    @IsString()
    @IsOptional()
    station: string;

    @ApiProperty({
        description: 'La plata que se puso para cargar nafta'
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price: number;

    @ApiProperty({
        description: 'Son los litros de nafta puestos en este registro'
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    liters: number;

    @ApiProperty({
        description: 'Es la persona que puso nafta en este registro'
    })
    @IsString()
    @IsOptional()
    who: string;

}
