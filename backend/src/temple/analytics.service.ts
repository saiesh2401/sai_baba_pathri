import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
    constructor(private prisma: PrismaService) { }

    async getDashboardStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Today's bookings
        const todayBookings = await this.prisma.booking.count({
            where: {
                createdAt: {
                    gte: today,
                    lt: tomorrow,
                },
            },
        });

        // Today's revenue
        const todayRevenue = await this.prisma.booking.aggregate({
            where: {
                createdAt: {
                    gte: today,
                    lt: tomorrow,
                },
                paymentStatus: 'PAID',
            },
            _sum: {
                amount: true,
            },
        });

        // Upcoming bookings (next 7 days)
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);

        const upcomingBookings = await this.prisma.booking.findMany({
            where: {
                bookingDate: {
                    gte: new Date(),
                    lte: nextWeek,
                },
            },
            include: {
                devotee: true,
                seva: true,
            },
            orderBy: {
                bookingDate: 'asc',
            },
            take: 10,
        });

        // Payment status breakdown
        const paymentStatusBreakdown = await this.prisma.booking.groupBy({
            by: ['paymentStatus'],
            _count: true,
        });

        // Total bookings and revenue
        const totalStats = await this.prisma.booking.aggregate({
            _count: true,
            _sum: {
                amount: true,
            },
        });

        return {
            today: {
                bookings: todayBookings,
                revenue: todayRevenue._sum.amount || 0,
            },
            upcomingBookings,
            paymentStatusBreakdown: paymentStatusBreakdown.map(item => ({
                status: item.paymentStatus,
                count: item._count,
            })),
            total: {
                bookings: totalStats._count,
                revenue: totalStats._sum.amount || 0,
            },
        };
    }

    async getRevenueAnalytics(startDate?: string, endDate?: string) {
        const where: any = {
            paymentStatus: 'PAID',
        };

        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) {
                where.createdAt.gte = new Date(startDate);
            }
            if (endDate) {
                where.createdAt.lte = new Date(endDate);
            }
        }

        const revenue = await this.prisma.booking.aggregate({
            where,
            _sum: {
                amount: true,
            },
            _count: true,
            _avg: {
                amount: true,
            },
        });

        // Revenue by seva
        const revenueBySeva = await this.prisma.booking.groupBy({
            by: ['sevaId'],
            where,
            _sum: {
                amount: true,
            },
            _count: true,
        });

        const sevaDetails = await this.prisma.seva.findMany({
            where: {
                id: {
                    in: revenueBySeva.map(r => r.sevaId),
                },
            },
        });

        const revenueBySevaWithNames = revenueBySeva.map(item => {
            const seva = sevaDetails.find(s => s.id === item.sevaId);
            return {
                sevaId: item.sevaId,
                sevaName: seva?.name || 'Unknown',
                revenue: item._sum.amount || 0,
                bookings: item._count,
            };
        });

        return {
            total: revenue._sum.amount || 0,
            count: revenue._count,
            average: revenue._avg.amount || 0,
            bySeva: revenueBySevaWithNames,
        };
    }

    async getPopularSevas(limit: number = 10) {
        const sevaStats = await this.prisma.booking.groupBy({
            by: ['sevaId'],
            _count: true,
            _sum: {
                amount: true,
            },
            orderBy: {
                _count: {
                    sevaId: 'desc',
                },
            },
            take: limit,
        });

        const sevaDetails = await this.prisma.seva.findMany({
            where: {
                id: {
                    in: sevaStats.map(s => s.sevaId),
                },
            },
        });

        return sevaStats.map(item => {
            const seva = sevaDetails.find(s => s.id === item.sevaId);
            return {
                sevaId: item.sevaId,
                sevaName: seva?.name || 'Unknown',
                bookings: item._count,
                revenue: item._sum.amount || 0,
            };
        });
    }

    async getDevoteeStats() {
        const totalDevotees = await this.prisma.devotee.count();

        const repeatDevotees = await this.prisma.devotee.findMany({
            include: {
                _count: {
                    select: { bookings: true },
                },
            },
        });

        const devoteesByBookings = repeatDevotees.filter(d => d._count.bookings > 1).length;

        return {
            total: totalDevotees,
            repeat: devoteesByBookings,
            new: totalDevotees - devoteesByBookings,
        };
    }
}
