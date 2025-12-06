import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/booking.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingController {
    constructor(private bookingService: BookingService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new booking' })
    create(@Body() dto: CreateBookingDto) {
        return this.bookingService.create(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all bookings with filters' })
    findAll(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('sevaId') sevaId?: string,
        @Query('paymentStatus') paymentStatus?: string,
    ) {
        return this.bookingService.findAll({
            startDate,
            endDate,
            sevaId: sevaId ? +sevaId : undefined,
            paymentStatus,
        });
    }

    @Get('dashboard/stats')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get dashboard statistics' })
    getDashboardStats() {
        return this.bookingService.getDashboardStats();
    }

    @Get('search')
    @ApiOperation({ summary: 'Search bookings by phone or email' })
    search(
        @Query('phone') phone?: string,
        @Query('email') email?: string,
    ) {
        return this.bookingService.searchBookings({ phone, email });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get booking by ID' })
    findOne(@Param('id') id: string) {
        return this.bookingService.findOne(+id);
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update booking status' })
    updateStatus(@Param('id') id: string, @Body() dto: UpdateBookingStatusDto) {
        return this.bookingService.updateStatus(+id, dto);
    }

    @Get('export/csv')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Export bookings to CSV' })
    async exportCSV(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.bookingService.exportToCSV({ startDate, endDate });
    }
}
