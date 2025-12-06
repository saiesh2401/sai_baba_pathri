import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({ enum: ['ADMIN', 'MANAGER', 'STAFF', 'STOREKEEPER'], required: false })
    @IsEnum(['ADMIN', 'MANAGER', 'STAFF', 'STOREKEEPER'])
    @IsOptional()
    role?: string;
}

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}
