import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateRegistroDto {

    @ApiProperty({
        description: 'El dia del registro (único)',
        nullable: false
    })
    @IsString()
    day: string;

    @ApiProperty({
        description: 'Los km del dia de este registro',
        nullable: false
    })
    @IsNumber()
    @IsPositive()
    km: number;

    @ApiProperty({
        description: 'Que se hizo en este dia',
        nullable: false
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Si se fue la estación o no',
    })
    @IsString()
    @IsOptional()
    station: string;
}
