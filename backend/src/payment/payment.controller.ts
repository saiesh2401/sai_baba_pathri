import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentService } from './payment.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
    constructor(private paymentService: PaymentService) { }

    @Post('initiate/:bookingId')
    @ApiOperation({ summary: 'Initiate payment for a booking' })
    async initiatePayment(
        @Param('bookingId') bookingId: string,
        @Body() body: { amount: number },
    ) {
        return this.paymentService.initiatePayment(+bookingId, body.amount);
    }

    @Post('verify')
    @ApiOperation({ summary: 'Verify payment' })
    async verifyPayment(
        @Body() body: { orderId: string; paymentId: string; signature: string },
    ) {
        return this.paymentService.verifyPayment(body.orderId, body.paymentId, body.signature);
    }

    @Post('webhook')
    @ApiOperation({ summary: 'Payment gateway webhook' })
    async handleWebhook(@Body() payload: any) {
        return this.paymentService.handleWebhook(payload);
    }

    @Get('sandbox/:bookingId')
    @ApiOperation({ summary: 'Sandbox payment page' })
    async sandboxPayment(@Param('bookingId') bookingId: string) {
        return {
            message: 'Sandbox Payment Page',
            bookingId,
            instructions: 'In sandbox mode, all payments are automatically approved',
            actions: [
                {
                    label: 'Mark as Paid',
                    endpoint: `POST /payments/sandbox/${bookingId}/success`,
                },
                {
                    label: 'Mark as Failed',
                    endpoint: `POST /payments/sandbox/${bookingId}/failure`,
                },
            ],
        };
    }

    @Post('sandbox/:bookingId/success')
    @ApiOperation({ summary: 'Sandbox - Mark payment as successful' })
    async sandboxSuccess(@Param('bookingId') bookingId: string) {
        await this.paymentService.updateBookingPayment(+bookingId, 'PAID', `sandbox_${Date.now()}`);
        return { success: true, message: 'Payment marked as successful' };
    }

    @Post('sandbox/:bookingId/failure')
    @ApiOperation({ summary: 'Sandbox - Mark payment as failed' })
    async sandboxFailure(@Param('bookingId') bookingId: string) {
        await this.paymentService.updateBookingPayment(+bookingId, 'FAILED');
        return { success: true, message: 'Payment marked as failed' };
    }
}
