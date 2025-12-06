import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateLivestreamDto } from './dto/livestream.dto';

@Injectable()
export class LivestreamService {
    constructor(private prisma: PrismaService) { }

    async getCurrent() {
        const stream = await this.prisma.livestream.findFirst({
            orderBy: { createdAt: 'desc' },
        });

        if (!stream) {
            return {
                isLive: false,
                platform: 'YouTube',
                streamUrl: null,
            };
        }

        return stream;
    }

    async update(dto: UpdateLivestreamDto) {
        const current = await this.prisma.livestream.findFirst({
            orderBy: { createdAt: 'desc' },
        });

        if (current) {
            return this.prisma.livestream.update({
                where: { id: current.id },
                data: {
                    ...dto,
                    startedAt: dto.isLive ? new Date() : current.startedAt,
                    endedAt: !dto.isLive ? new Date() : null,
                },
            });
        }

        return this.prisma.livestream.create({
            data: {
                ...dto,
                startedAt: dto.isLive ? new Date() : null,
            },
        });
    }
}
