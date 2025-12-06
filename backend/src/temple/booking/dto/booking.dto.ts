import { IsString, IsNumber, IsDateString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    gotra?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty()
    @IsNumber()
    sevaId: number;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    eventId?: number;

    @ApiProperty()
    @IsDateString()
    bookingDate: string;

    @ApiProperty()
    @IsNumber()
    amount: number;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    sankalp?: string;
}

export class UpdateBookingStatusDto {
    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    checkedIn?: boolean;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    poojaCompleted?: boolean;
}
