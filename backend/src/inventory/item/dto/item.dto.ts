import { IsString, IsNumber, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ enum: ['KITCHEN', 'POOJA', 'SHOP', 'OTHER'] })
    @IsEnum(['KITCHEN', 'POOJA', 'SHOP', 'OTHER'])
    category: string;

    @ApiProperty()
    @IsString()
    unit: string;

    @ApiProperty()
    @IsNumber()
    minStock: number;
}

export class UpdateItemDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ enum: ['KITCHEN', 'POOJA', 'SHOP', 'OTHER'], required: false })
    @IsEnum(['KITCHEN', 'POOJA', 'SHOP', 'OTHER'])
    @IsOptional()
    category?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    unit?: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    minStock?: number;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
