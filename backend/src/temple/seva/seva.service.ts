import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSevaDto, UpdateSevaDto } from './dto/seva.dto';

@Injectable()
export class SevaService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateSevaDto) {
        return this.prisma.seva.create({
            data: dto,
        });
    }

    async findAll(isActive?: boolean) {
        return this.prisma.seva.findMany({
            where: isActive !== undefined ? { isActive } : undefined,
            orderBy: { name: 'asc' },
        });
    }

    async findOne(id: number) {
        return this.prisma.seva.findUnique({
            where: { id },
        });
    }

    async update(id: number, dto: UpdateSevaDto) {
        return this.prisma.seva.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: number) {
        return this.prisma.seva.update({
            where: { id },
            data: { isActive: false },
        });
    }
}
