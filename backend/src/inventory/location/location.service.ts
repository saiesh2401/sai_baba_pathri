import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';

@Injectable()
export class LocationService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateLocationDto) {
        return this.prisma.location.create({
            data: dto as any,
        });
    }

    async findAll() {
        return this.prisma.location.findMany({
            orderBy: { name: 'asc' },
        });
    }

    async findOne(id: number) {
        return this.prisma.location.findUnique({
            where: { id },
        });
    }

    async update(id: number, dto: UpdateLocationDto) {
        return this.prisma.location.update({
            where: { id },
            data: dto as any,
        });
    }
}
