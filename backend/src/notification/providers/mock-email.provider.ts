import { Injectable } from '@nestjs/common';
import {
    IEmailProvider,
    SendEmailParams,
    EmailResponse,
} from '../interfaces/notification-provider.interface';

/**
 * Mock Email Provider
 * 
 * This is a mock implementation for development/testing.
 * Logs emails to console instead of sending them.
 * 
 * To integrate a real email service:
 * 1. For Mailgun: npm install mailgun.js form-data
 * 2. For SendGrid: npm install @sendgrid/mail
 * 3. Create a new provider class implementing IEmailProvider
 * 4. Update notification.module.ts to use the new provider
 * 5. Add service credentials to .env file
 */
@Injectable()
export class MockEmailProvider implements IEmailProvider {
    getProviderName(): string {
        return 'Mock Email Service';
    }

    async sendEmail(params: SendEmailParams): Promise<EmailResponse> {
        console.log('\n========== MOCK EMAIL ==========');
        console.log('To:', params.to);
        console.log('Subject:', params.subject);
        console.log('From:', params.from || 'noreply@saibaba-pathri.org');
        if (params.cc) console.log('CC:', params.cc);
        if (params.bcc) console.log('BCC:', params.bcc);
        console.log('\n--- Email Body ---');
        console.log(params.text || params.html);
        console.log('================================\n');

        return {
            success: true,
            messageId: `mock_email_${Date.now()}`,
        };
    }
}
