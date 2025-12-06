import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ enum: ['STORE', 'TEMPLE', 'KITCHEN', 'SHOP', 'OFFICE'] })
    @IsEnum(['STORE', 'TEMPLE', 'KITCHEN', 'SHOP', 'OFFICE'])
    type: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    description?: string;
}

export class UpdateLocationDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ enum: ['STORE', 'TEMPLE', 'KITCHEN', 'SHOP', 'OFFICE'], required: false })
    @IsEnum(['STORE', 'TEMPLE', 'KITCHEN', 'SHOP', 'OFFICE'])
    @IsOptional()
    type?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    description?: string;
}
