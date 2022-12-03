import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Registro {

    @ApiProperty({
        example: '1',
        uniqueItems: true,
        description: 'ID del registro'
    })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({
        example: '17 de noviembre 2022',
        uniqueItems: true,
        description: 'Dia del registro'
    })
    @Column('text',{
        unique: true,
    })
    day: string;

    @ApiProperty({
        example: '5222.2',
        description: 'Kilómetros del registro'
    })
    @Column('float')
    km: number;

    @ApiProperty({
        example: 'Salida al prado',
        description: 'Es la info se que se hizo en este dia'
    })
    @Column('text')
    description: string;

    @ApiProperty({
        example: 'Si',
        description: 'Si en este registro se puso nafta o no'
    })
    @Column('text',{
        default: 'No'
    })
    station: string;

    @ApiProperty({
        example: '500',
        description: 'La plata que se puso para cargar nafta'
    })
    @Column('float',{
        default: 0,
    })
    price: number;

    @ApiProperty({
        example: '6.67',
        description: 'Son los litros de nafta puestos en este registro'
    })
    @Column('float',{
        default: 0,
    })
    liters: number;

    @ApiProperty({
        example: 'Romi',
        description: 'Es la persona que puso nafta en este registro'
    })
    @Column('text',{
        default: 'Yo',
    })
    who: string;

}
