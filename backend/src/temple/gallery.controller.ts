import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Patch } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('gallery')
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'MANAGER')
    create(@Body() createGalleryDto: CreateGalleryDto) {
        return this.galleryService.create(createGalleryDto);
    }

    @Get()
    findAll(@Query('category') category?: string) {
        return this.galleryService.findAll(category);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.galleryService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'MANAGER')
    update(@Param('id') id: string, @Body() updateData: Partial<CreateGalleryDto>) {
        return this.galleryService.update(+id, updateData);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    remove(@Param('id') id: string) {
        return this.galleryService.delete(+id);
    }
}
