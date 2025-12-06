import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SevaService } from './seva.service';
import { CreateSevaDto, UpdateSevaDto } from './dto/seva.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Sevas')
@Controller('sevas')
export class SevaController {
    constructor(private sevaService: SevaService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new seva' })
    create(@Body() dto: CreateSevaDto) {
        return this.sevaService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all sevas' })
    findAll(@Query('isActive') isActive?: string) {
        const active = isActive === 'true' ? true : isActive === 'false' ? false : undefined;
        return this.sevaService.findAll(active);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get seva by ID' })
    findOne(@Param('id') id: string) {
        return this.sevaService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update seva' })
    update(@Param('id') id: string, @Body() dto: UpdateSevaDto) {
        return this.sevaService.update(+id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Deactivate seva' })
    remove(@Param('id') id: string) {
        return this.sevaService.remove(+id);
    }
}
