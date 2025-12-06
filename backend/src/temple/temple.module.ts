import { Module } from '@nestjs/common';
import { SevaController } from './seva/seva.controller';
import { SevaService } from './seva/seva.service';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';
import { LivestreamController } from './livestream/livestream.controller';
import { LivestreamService } from './livestream/livestream.service';

@Module({
    controllers: [SevaController, BookingController, LivestreamController],
    providers: [SevaService, BookingService, LivestreamService],
    exports: [SevaService, BookingService],
})
export class TempleModule { }
