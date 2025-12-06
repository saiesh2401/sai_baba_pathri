import { IsNumber, IsEnum, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
    @ApiProperty()
    @IsNumber()
    itemId: number;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    fromLocationId?: number;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    toLocationId?: number;

    @ApiProperty()
    @IsNumber()
    quantity: number;

    @ApiProperty({ enum: ['PURCHASE', 'DONATION', 'TRANSFER', 'CONSUMPTION', 'SALE', 'ADJUSTMENT'] })
    @IsEnum(['PURCHASE', 'DONATION', 'TRANSFER', 'CONSUMPTION', 'SALE', 'ADJUSTMENT'])
    type: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    notes?: string;
}
