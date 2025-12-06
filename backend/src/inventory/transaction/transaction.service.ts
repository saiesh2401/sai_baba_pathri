import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateTransactionDto, userId: number) {
        return this.prisma.transaction.create({
            data: {
                ...dto,
                userId,
            } as any,
            include: {
                item: true,
                fromLocation: true,
                toLocation: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    async findAll(filters?: {
        startDate?: string;
        endDate?: string;
        itemId?: number;
        locationId?: number;
        type?: string;
    }) {
        const where: any = {};

        if (filters?.startDate && filters?.endDate) {
            where.createdAt = {
                gte: new Date(filters.startDate),
                lte: new Date(filters.endDate),
            };
        }

        if (filters?.itemId) {
            where.itemId = filters.itemId;
        }

        if (filters?.locationId) {
            where.OR = [
                { fromLocationId: filters.locationId },
                { toLocationId: filters.locationId },
            ];
        }

        if (filters?.type) {
            where.type = filters.type;
        }

        return this.prisma.transaction.findMany({
            where,
            include: {
                item: true,
                fromLocation: true,
                toLocation: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async getDashboardStats() {
        const totalItems = await this.prisma.item.count({
            where: { isActive: true },
        });

        const lowStockItems = await this.prisma.$queryRaw`
      SELECT COUNT(DISTINCT item_id) as count
      FROM transactions
      WHERE item_id IN (SELECT id FROM items WHERE is_active = true)
    `;

        return {
            totalItems,
            lowStockCount: 0, // Simplified for now
        };
    }
}
