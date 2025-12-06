import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MockPaymentProvider } from './providers/mock-payment.provider';
// import { RazorpayPaymentProvider } from './providers/razorpay-payment.provider';

/**
 * Payment Module
 * 
 * This module uses a provider pattern for payment gateway integration.
 * 
 * CURRENT SETUP: Using MockPaymentProvider for development/testing
 * 
 * TO SWITCH TO RAZORPAY (or other gateway):
 * 1. Uncomment the import for RazorpayPaymentProvider above
 * 2. Install the SDK: npm install razorpay
 * 3. Add credentials to .env file:
 *    RAZORPAY_KEY_ID=your_key_id
 *    RAZORPAY_KEY_SECRET=your_key_secret
 * 4. Change the provider in the providers array below:
 *    Replace MockPaymentProvider with RazorpayPaymentProvider
 * 5. Restart the server
 * 
 * That's it! No other code changes needed.
 */

@Module({
    controllers: [PaymentController],
    providers: [
        PaymentService,
        {
            provide: 'PAYMENT_PROVIDER',
            // CHANGE THIS LINE to switch payment providers
            useClass: MockPaymentProvider,
            // useClass: RazorpayPaymentProvider, // Uncomment to use Razorpay
        },
    ],
    exports: [PaymentService],
})
export class PaymentModule { }
