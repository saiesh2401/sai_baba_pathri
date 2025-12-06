import { Injectable } from '@nestjs/common';
import {
    IPaymentProvider,
    CreateOrderParams,
    PaymentOrder,
    VerifyPaymentParams,
    PaymentStatus,
    RefundParams,
    RefundResponse,
} from '../interfaces/payment-provider.interface';

/**
 * Mock Payment Provider
 * 
 * This is a mock implementation for development/testing.
 * Replace with actual payment gateway provider (Razorpay, PayU, etc.) in production.
 * 
 * To integrate a real payment gateway:
 * 1. Install the gateway SDK: npm install razorpay (or other)
 * 2. Create a new provider class implementing IPaymentProvider
 * 3. Update payment.module.ts to use the new provider
 * 4. Add gateway credentials to .env file
 */
@Injectable()
export class MockPaymentProvider implements IPaymentProvider {
    getProviderName(): string {
        return 'Mock Payment Gateway';
    }

    async createOrder(params: CreateOrderParams): Promise<PaymentOrder> {
        // Simulate order creation
        const orderId = `mock_order_${Date.now()}`;

        console.log(`[MockPayment] Creating order:`, {
            orderId,
            amount: params.amount,
            currency: params.currency,
            receipt: params.receipt,
        });

        return {
            id: orderId,
            amount: params.amount,
            currency: params.currency,
            receipt: params.receipt,
            status: 'created',
            createdAt: new Date(),
        };
    }

    async verifyPayment(params: VerifyPaymentParams): Promise<boolean> {
        // Mock verification - always returns true for testing
        console.log(`[MockPayment] Verifying payment:`, params);

        // In production, verify the signature using gateway's SDK
        // Example for Razorpay:
        // const crypto = require('crypto');
        // const expectedSignature = crypto
        //   .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        //   .update(params.orderId + '|' + params.paymentId)
        //   .digest('hex');
        // return expectedSignature === params.signature;

        return true;
    }

    async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
        console.log(`[MockPayment] Getting payment status for:`, paymentId);

        // Mock status - return captured for testing
        return PaymentStatus.CAPTURED;
    }

    async initiateRefund(params: RefundParams): Promise<RefundResponse> {
        console.log(`[MockPayment] Initiating refund:`, params);

        const refundId = `mock_refund_${Date.now()}`;

        return {
            id: refundId,
            paymentId: params.paymentId,
            amount: params.amount || 0,
            status: 'processed',
            createdAt: new Date(),
        };
    }
}
