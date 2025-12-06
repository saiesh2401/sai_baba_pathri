import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService) { }

    async create(dto: CreateBookingDto) {
        // Find or create devotee
        let devotee = await this.prisma.devotee.findUnique({
            where: { phone: dto.phone },
        });

        if (!devotee) {
            devotee = await this.prisma.devotee.create({
                data: {
                    name: dto.name,
                    phone: dto.phone,
                    email: dto.email,
                    gotra: dto.gotra,
                    address: dto.address,
                },
            });
        }

        // Create booking
        const booking = await this.prisma.booking.create({
            data: {
                devoteeId: devotee.id,
                sevaId: dto.sevaId,
                eventId: dto.eventId,
                bookingDate: new Date(dto.bookingDate),
                amount: dto.amount,
                sankalp: dto.sankalp,
                paymentStatus: 'PENDING',
            },
            include: {
                devotee: true,
                seva: true,
                event: true,
            },
        });

        return booking;
    }

    async findAll(filters?: {
        startDate?: string;
        endDate?: string;
        sevaId?: number;
        paymentStatus?: string;
    }) {
        const where: any = {};

        if (filters?.startDate && filters?.endDate) {
            where.bookingDate = {
                gte: new Date(filters.startDate),
                lte: new Date(filters.endDate),
            };
        }

        if (filters?.sevaId) {
            where.sevaId = filters.sevaId;
        }

        if (filters?.paymentStatus) {
            where.paymentStatus = filters.paymentStatus;
        }

        return this.prisma.booking.findMany({
            where,
            include: {
                devotee: true,
                seva: true,
                event: true,
            },
            orderBy: { bookingDate: 'desc' },
        });
    }

    async findOne(id: number) {
        return this.prisma.booking.findUnique({
            where: { id },
            include: {
                devotee: true,
                seva: true,
                event: true,
            },
        });
    }

    async updateStatus(id: number, dto: UpdateBookingStatusDto) {
        return this.prisma.booking.update({
            where: { id },
            data: dto,
        });
    }

    async updatePaymentStatus(id: number, status: string, paymentId?: string) {
        return this.prisma.booking.update({
            where: { id },
            data: {
                paymentStatus: status as any,
                paymentId,
            },
        });
    }

    async getDashboardStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todayBookings = await this.prisma.booking.count({
            where: {
                bookingDate: {
                    gte: today,
                    lt: tomorrow,
                },
            },
        });

        const todayRevenue = await this.prisma.booking.aggregate({
            where: {
                bookingDate: {
                    gte: today,
                    lt: tomorrow,
                },
                paymentStatus: 'PAID',
            },
            _sum: {
                amount: true,
            },
        });

        const next7Days = new Date(today);
        next7Days.setDate(next7Days.getDate() + 7);

        const upcomingBookings = await this.prisma.booking.count({
            where: {
                bookingDate: {
                    gte: tomorrow,
                    lt: next7Days,
                },
            },
        });

        return {
            todayBookings,
            todayRevenue: todayRevenue._sum.amount || 0,
            upcomingBookings,
        };
    }
}
