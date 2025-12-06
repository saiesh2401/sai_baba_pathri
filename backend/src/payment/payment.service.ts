import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
    private isSandbox: boolean;

    constructor(
        private config: ConfigService,
        private prisma: PrismaService,
    ) {
        this.isSandbox = this.config.get('PAYMENT_MODE') === 'sandbox';
    }

    async initiatePayment(bookingId: number, amount: number) {
        if (this.isSandbox) {
            // Sandbox mode - return mock payment data
            return {
                orderId: `sandbox_order_${Date.now()}`,
                amount,
                currency: 'INR',
                paymentUrl: `http://localhost:3000/payment/sandbox/${bookingId}`,
                isSandbox: true,
            };
        }

        // TODO: Implement actual Razorpay integration when ready
        throw new Error('Production payment gateway not configured');
    }

    async verifyPayment(orderId: string, paymentId: string, signature: string) {
        if (this.isSandbox) {
            // Sandbox mode - always return success
            return {
                success: true,
                orderId,
                paymentId,
                isSandbox: true,
            };
        }

        // TODO: Implement actual Razorpay signature verification
        throw new Error('Production payment gateway not configured');
    }

    async handleWebhook(payload: any) {
        if (this.isSandbox) {
            // Sandbox mode - mock webhook handling
            console.log('Sandbox webhook received:', payload);
            return { received: true, isSandbox: true };
        }

        // TODO: Implement actual Razorpay webhook handling
        throw new Error('Production payment gateway not configured');
    }

    async updateBookingPayment(bookingId: number, status: 'PAID' | 'FAILED', paymentId?: string) {
        return this.prisma.booking.update({
            where: { id: bookingId },
            data: {
                paymentStatus: status,
                paymentId,
            },
        });
    }
}
