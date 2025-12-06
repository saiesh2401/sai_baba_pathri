import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateItemDto) {
        return this.prisma.item.create({
            data: dto as any,
        });
    }

    async findAll(isActive?: boolean) {
        return this.prisma.item.findMany({
            where: isActive !== undefined ? { isActive } : undefined,
            orderBy: { name: 'asc' },
        });
    }

    async findOne(id: number) {
        return this.prisma.item.findUnique({
            where: { id },
        });
    }

    async update(id: number, dto: UpdateItemDto) {
        return this.prisma.item.update({
            where: { id },
            data: dto as any,
        });
    }

    async remove(id: number) {
        return this.prisma.item.update({
            where: { id },
            data: { isActive: false },
        });
    }

    async getLowStockItems() {
        // Get all items with their current stock levels
        const items = await this.prisma.item.findMany({
            where: { isActive: true },
        });

        const lowStockItems: any[] = [];

        for (const item of items) {
            const stock = await this.getItemStock(item.id);
            if (stock < Number(item.minStock)) {
                lowStockItems.push({
                    ...item,
                    currentStock: stock,
                });
            }
        }

        return lowStockItems;
    }

    async getItemStock(itemId: number, locationId?: number) {
        const transactions = await this.prisma.transaction.findMany({
            where: {
                itemId,
                ...(locationId ? { toLocationId: locationId } : {}),
            },
        });

        let stock = 0;
        for (const txn of transactions) {
            if (txn.toLocationId === locationId || !locationId) {
                stock += Number(txn.quantity);
            }
        }

        return stock;
    }
}
