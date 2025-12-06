import { IsString, IsOptional } from 'class-validator';

export class CreateGalleryDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    category: string; // temple, festival, seva, architecture

    @IsString()
    imageUrl: string;
}
