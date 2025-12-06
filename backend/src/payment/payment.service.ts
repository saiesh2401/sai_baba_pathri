import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import type { IPaymentProvider } from './interfaces/payment-provider.interface';

/**
 * Payment Service
 * 
 * This service uses a provider pattern for payment gateway integration.
 * The actual payment gateway (Mock, Razorpay, PayU, etc.) is injected via dependency injection.
 * 
 * To switch payment providers:
 * 1. Update payment.module.ts to provide a different IPaymentProvider implementation
 * 2. No changes needed in this service!
 */

@Injectable()
export class PaymentService {
    constructor(
        @Inject('PAYMENT_PROVIDER') private paymentProvider: IPaymentProvider,
        private config: ConfigService,
        private prisma: PrismaService,
    ) {
        console.log(`[PaymentService] Using provider: ${this.paymentProvider.getProviderName()}`);
    }

    /**
     * Initiate a payment for a booking
     */
    async initiatePayment(bookingId: number, amount: number) {
        try {
            const order = await this.paymentProvider.createOrder({
                amount: amount * 100, // Convert to paise
                currency: 'INR',
                receipt: `booking_${bookingId}`,
                notes: {
                    bookingId: bookingId.toString(),
                },
            });

            return {
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                receipt: order.receipt,
                provider: this.paymentProvider.getProviderName(),
            };
        } catch (error) {
            console.error('[PaymentService] Error initiating payment:', error);
            throw error;
        }
    }

    /**
     * Verify a payment after completion
     */
    async verifyPayment(orderId: string, paymentId: string, signature: string) {
        try {
            const isValid = await this.paymentProvider.verifyPayment({
                orderId,
                paymentId,
                signature,
            });

            return {
                success: isValid,
                orderId,
                paymentId,
                provider: this.paymentProvider.getProviderName(),
            };
        } catch (error) {
            console.error('[PaymentService] Error verifying payment:', error);
            throw error;
        }
    }

    /**
     * Handle payment gateway webhook
     */
    async handleWebhook(payload: any) {
        try {
            console.log('[PaymentService] Webhook received:', payload);

            // Extract payment details from webhook
            // Note: Webhook structure varies by provider
            // This is a generic implementation

            const { orderId, paymentId, status } = payload;

            // Verify the payment
            const isValid = await this.paymentProvider.verifyPayment({
                orderId,
                paymentId,
                signature: payload.signature || '',
            });

            if (!isValid) {
                throw new Error('Invalid webhook signature');
            }

            return {
                received: true,
                verified: isValid,
                provider: this.paymentProvider.getProviderName(),
            };
        } catch (error) {
            console.error('[PaymentService] Error handling webhook:', error);
            throw error;
        }
    }

    /**
     * Get payment status
     */
    async getPaymentStatus(paymentId: string) {
        try {
            const status = await this.paymentProvider.getPaymentStatus(paymentId);
            return {
                paymentId,
                status,
                provider: this.paymentProvider.getProviderName(),
            };
        } catch (error) {
            console.error('[PaymentService] Error getting payment status:', error);
            throw error;
        }
    }

    /**
     * Initiate a refund
     */
    async initiateRefund(paymentId: string, amount?: number, notes?: Record<string, string>) {
        try {
            const refund = await this.paymentProvider.initiateRefund({
                paymentId,
                amount: amount ? amount * 100 : undefined, // Convert to paise if provided
                notes,
            });

            return {
                refundId: refund.id,
                paymentId: refund.paymentId,
                amount: refund.amount,
                status: refund.status,
                provider: this.paymentProvider.getProviderName(),
            };
        } catch (error) {
            console.error('[PaymentService] Error initiating refund:', error);
            throw error;
        }
    }

    /**
     * Update booking payment status
     */
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
