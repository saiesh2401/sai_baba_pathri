import { Module } from '@nestjs/common';
import { SevaController } from './seva/seva.controller';
import { SevaService } from './seva/seva.service';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';
import { LivestreamController } from './livestream/livestream.controller';
import { LivestreamService } from './livestream/livestream.service';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { ExportService } from './export.service';

@Module({
    controllers: [
        SevaController,
        BookingController,
        LivestreamController,
        DonationsController,
        GalleryController,
        AnalyticsController,
    ],
    providers: [
        SevaService,
        BookingService,
        LivestreamService,
        DonationsService,
        GalleryService,
        AnalyticsService,
        ExportService,
    ],
    exports: [
        SevaService,
        BookingService,
        DonationsService,
        GalleryService,
        AnalyticsService,
        ExportService,
    ],
})
export class TempleModule { }
