import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
    constructor(private prisma: PrismaService) { }

    async create(createDonationDto: CreateDonationDto) {
        // Generate receipt number
        const receiptNumber = `DN${Date.now()}`;

        return this.prisma.donation.create({
            data: {
                ...createDonationDto,
                receiptNumber,
            },
        });
    }

    async findAll(filters?: { startDate?: string; endDate?: string; purpose?: string }) {
        const where: any = {};

        if (filters?.startDate || filters?.endDate) {
            where.createdAt = {};
            if (filters.startDate) {
                where.createdAt.gte = new Date(filters.startDate);
            }
            if (filters.endDate) {
                where.createdAt.lte = new Date(filters.endDate);
            }
        }

        if (filters?.purpose) {
            where.purpose = filters.purpose;
        }

        return this.prisma.donation.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: number) {
        return this.prisma.donation.findUnique({
            where: { id },
        });
    }

    async updatePaymentStatus(id: number, paymentStatus: string, paymentId?: string) {
        return this.prisma.donation.update({
            where: { id },
            data: {
                paymentStatus: paymentStatus as any,
                paymentId,
            },
        });
    }

    async getTotalDonations(filters?: { startDate?: string; endDate?: string }) {
        const where: any = {};

        if (filters?.startDate || filters?.endDate) {
            where.createdAt = {};
            if (filters.startDate) {
                where.createdAt.gte = new Date(filters.startDate);
            }
            if (filters.endDate) {
                where.createdAt.lte = new Date(filters.endDate);
            }
        }

        const result = await this.prisma.donation.aggregate({
            where,
            _sum: {
                amount: true,
            },
            _count: true,
        });

        return {
            total: result._sum.amount || 0,
            count: result._count,
        };
    }

    async getDonationsByPurpose() {
        const donations = await this.prisma.donation.groupBy({
            by: ['purpose'],
            _sum: {
                amount: true,
            },
            _count: true,
        });

        return donations.map(d => ({
            purpose: d.purpose,
            total: d._sum.amount || 0,
            count: d._count,
        }));
    }
}
