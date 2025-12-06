import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';

@Injectable()
export class GalleryService {
    constructor(private prisma: PrismaService) { }

    async create(createGalleryDto: CreateGalleryDto) {
        return this.prisma.gallery.create({
            data: createGalleryDto,
        });
    }

    async findAll(category?: string) {
        const where: any = { isActive: true };

        if (category) {
            where.category = category;
        }

        return this.prisma.gallery.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: number) {
        return this.prisma.gallery.findUnique({
            where: { id },
        });
    }

    async update(id: number, updateData: Partial<CreateGalleryDto>) {
        return this.prisma.gallery.update({
            where: { id },
            data: updateData,
        });
    }

    async remove(id: number) {
        return this.prisma.gallery.update({
            where: { id },
            data: { isActive: false },
        });
    }

    async delete(id: number) {
        return this.prisma.gallery.delete({
            where: { id },
        });
    }
}
