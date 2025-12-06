import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LivestreamService } from './livestream.service';
import { UpdateLivestreamDto } from './dto/livestream.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Livestream')
@Controller('livestream')
export class LivestreamController {
    constructor(private livestreamService: LivestreamService) { }

    @Get('current')
    @ApiOperation({ summary: 'Get current livestream status' })
    getCurrent() {
        return this.livestreamService.getCurrent();
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update livestream configuration' })
    update(@Body() dto: UpdateLivestreamDto) {
        return this.livestreamService.update(dto);
    }
}
