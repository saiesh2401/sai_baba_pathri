// Payment Provider Interface - allows easy switching between payment gateways
export interface IPaymentProvider {
    // Create a payment order
    createOrder(params: CreateOrderParams): Promise<PaymentOrder>;

    // Verify payment signature/callback
    verifyPayment(params: VerifyPaymentParams): Promise<boolean>;

    // Get payment status
    getPaymentStatus(paymentId: string): Promise<PaymentStatus>;

    // Initiate refund
    initiateRefund(params: RefundParams): Promise<RefundResponse>;

    // Get provider name
    getProviderName(): string;
}

export interface CreateOrderParams {
    amount: number; // in smallest currency unit (paise for INR)
    currency: string; // e.g., 'INR'
    receipt: string; // unique receipt ID
    notes?: Record<string, string>;
}

export interface PaymentOrder {
    id: string; // payment gateway order ID
    amount: number;
    currency: string;
    receipt: string;
    status: string;
    createdAt: Date;
}

export interface VerifyPaymentParams {
    orderId: string;
    paymentId: string;
    signature: string;
}

export enum PaymentStatus {
    CREATED = 'CREATED',
    AUTHORIZED = 'AUTHORIZED',
    CAPTURED = 'CAPTURED',
    REFUNDED = 'REFUNDED',
    FAILED = 'FAILED',
}

export interface RefundParams {
    paymentId: string;
    amount?: number; // optional for partial refund
    notes?: Record<string, string>;
}

export interface RefundResponse {
    id: string;
    paymentId: string;
    amount: number;
    status: string;
    createdAt: Date;
}
