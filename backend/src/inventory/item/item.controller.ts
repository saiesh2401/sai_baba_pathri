import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Inventory - Items')
@Controller('inventory/items')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ItemController {
    constructor(private itemService: ItemService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new item' })
    create(@Body() dto: CreateItemDto) {
        return this.itemService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all items' })
    findAll(@Query('isActive') isActive?: string) {
        const active = isActive === 'true' ? true : isActive === 'false' ? false : undefined;
        return this.itemService.findAll(active);
    }

    @Get('low-stock')
    @ApiOperation({ summary: 'Get low stock items' })
    getLowStockItems() {
        return this.itemService.getLowStockItems();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get item by ID' })
    findOne(@Param('id') id: string) {
        return this.itemService.findOne(+id);
    }

    @Get(':id/stock')
    @ApiOperation({ summary: 'Get item stock level' })
    getStock(@Param('id') id: string, @Query('locationId') locationId?: string) {
        return this.itemService.getItemStock(+id, locationId ? +locationId : undefined);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update item' })
    update(@Param('id') id: string, @Body() dto: UpdateItemDto) {
        return this.itemService.update(+id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deactivate item' })
    remove(@Param('id') id: string) {
        return this.itemService.remove(+id);
    }
}
