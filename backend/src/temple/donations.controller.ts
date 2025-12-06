import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('donations')
export class DonationsController {
    constructor(private readonly donationsService: DonationsService) { }

    @Post()
    create(@Body() createDonationDto: CreateDonationDto) {
        return this.donationsService.create(createDonationDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'MANAGER')
    findAll(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
        @Query('purpose') purpose?: string,
    ) {
        return this.donationsService.findAll({ startDate, endDate, purpose });
    }

    @Get('stats/total')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'MANAGER')
    getTotalDonations(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.donationsService.getTotalDonations({ startDate, endDate });
    }

    @Get('stats/by-purpose')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN', 'MANAGER')
    getDonationsByPurpose() {
        return this.donationsService.getDonationsByPurpose();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.donationsService.findOne(+id);
    }
}
