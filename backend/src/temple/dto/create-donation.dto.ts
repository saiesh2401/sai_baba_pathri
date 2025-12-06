import { IsString, IsEmail, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateDonationDto {
    @IsString()
    donorName: string;

    @IsString()
    donorPhone: string;

    @IsEmail()
    @IsOptional()
    donorEmail?: string;

    @IsNumber()
    @Min(1)
    amount: number;

    @IsString()
    purpose: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    panNumber?: string;
}
