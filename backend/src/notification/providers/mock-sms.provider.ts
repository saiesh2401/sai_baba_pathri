import { Injectable } from '@nestjs/common';
import {
    ISMSProvider,
    SendSMSParams,
    SMSResponse,
} from '../interfaces/notification-provider.interface';

/**
 * Mock SMS Provider
 * 
 * This is a mock implementation for development/testing.
 * Logs SMS to console instead of sending them.
 * 
 * To integrate a real SMS service:
 * 1. For Twilio: npm install twilio
 * 2. For Textlocal: npm install axios (use their REST API)
 * 3. Create a new provider class implementing ISMSProvider
 * 4. Update notification.module.ts to use the new provider
 * 5. Add service credentials to .env file
 */
@Injectable()
export class MockSMSProvider implements ISMSProvider {
    getProviderName(): string {
        return 'Mock SMS Service';
    }

    async sendSMS(params: SendSMSParams): Promise<SMSResponse> {
        console.log('\n========== MOCK SMS ==========');
        console.log('To:', params.to);
        console.log('From:', params.from || 'SAIBABA');
        console.log('\n--- Message ---');
        console.log(params.message);
        console.log('==============================\n');

        return {
            success: true,
            messageId: `mock_sms_${Date.now()}`,
        };
    }
}
