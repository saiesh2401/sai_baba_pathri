import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('dashboard')
    getDashboardStats() {
        return this.analyticsService.getDashboardStats();
    }

    @Get('revenue')
    getRevenueAnalytics(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        return this.analyticsService.getRevenueAnalytics(startDate, endDate);
    }

    @Get('popular-sevas')
    getPopularSevas(@Query('limit') limit?: string) {
        return this.analyticsService.getPopularSevas(limit ? +limit : 10);
    }

    @Get('devotee-stats')
    getDevoteeStats() {
        return this.analyticsService.getDevoteeStats();
    }
}
