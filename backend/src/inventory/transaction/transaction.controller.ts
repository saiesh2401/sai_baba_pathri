import { Controller, Get, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/transaction.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Inventory - Transactions')
@Controller('inventory/transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TransactionController {
    constructor(private transactionService: TransactionService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new transaction' })
    create(@Body() dto: CreateTransactionDto, @Request() req) {
        return this.transactionService.create(dto, req.user.id);
    }

    @Get()
    @ApiOperation({ summary: 'Get all transactions with filters' })
    findAll(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('itemId') itemId?: string,
        @Query('locationId') locationId?: string,
        @Query('type') type?: string,
    ) {
        return this.transactionService.findAll({
            startDate,
            endDate,
            itemId: itemId ? +itemId : undefined,
            locationId: locationId ? +locationId : undefined,
            type,
        });
    }

    @Get('dashboard/stats')
    @ApiOperation({ summary: 'Get inventory dashboard statistics' })
    getDashboardStats() {
        return this.transactionService.getDashboardStats();
    }
}
