import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Inventory - Locations')
@Controller('inventory/locations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LocationController {
    constructor(private locationService: LocationService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new location' })
    create(@Body() dto: CreateLocationDto) {
        return this.locationService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all locations' })
    findAll() {
        return this.locationService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get location by ID' })
    findOne(@Param('id') id: string) {
        return this.locationService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update location' })
    update(@Param('id') id: string, @Body() dto: UpdateLocationDto) {
        return this.locationService.update(+id, dto);
    }
}
