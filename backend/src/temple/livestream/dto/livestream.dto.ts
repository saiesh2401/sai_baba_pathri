import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLivestreamDto {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    platform?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    streamUrl?: string;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    isLive?: boolean;
}
