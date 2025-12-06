import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MockEmailProvider } from './providers/mock-email.provider';
import { MockSMSProvider } from './providers/mock-sms.provider';
import { BookingConfirmationTemplate } from './templates/booking-confirmation.template';
// import { MailgunEmailProvider } from './providers/mailgun-email.provider';
// import { TwilioSMSProvider } from './providers/twilio-sms.provider';

/**
 * Notification Module
 * 
 * This module uses a provider pattern for email and SMS integration.
 * 
 * CURRENT SETUP: Using Mock providers for development/testing
 * 
 * TO SWITCH TO REAL PROVIDERS:
 * 
 * For Email (Mailgun):
 * 1. Uncomment the import for MailgunEmailProvider above
 * 2. Install the SDK: npm install mailgun.js form-data
 * 3. Add credentials to .env file:
 *    MAILGUN_API_KEY=your_api_key
 *    MAILGUN_DOMAIN=your_domain
 *    MAILGUN_FROM_EMAIL=noreply@your_domain.com
 * 4. Change EMAIL_PROVIDER below to use MailgunEmailProvider
 * 
 * For SMS (Twilio):
 * 1. Uncomment the import for TwilioSMSProvider above
 * 2. Install the SDK: npm install twilio
 * 3. Add credentials to .env file:
 *    TWILIO_ACCOUNT_SID=your_account_sid
 *    TWILIO_AUTH_TOKEN=your_auth_token
 *    TWILIO_PHONE_NUMBER=your_twilio_number
 * 4. Change SMS_PROVIDER below to use TwilioSMSProvider
 * 
 * That's it! No other code changes needed.
 */

@Module({
    providers: [
        NotificationService,
        BookingConfirmationTemplate,
        {
            provide: 'EMAIL_PROVIDER',
            // CHANGE THIS LINE to switch email providers
            useClass: MockEmailProvider,
            // useClass: MailgunEmailProvider, // Uncomment to use Mailgun
        },
        {
            provide: 'SMS_PROVIDER',
            // CHANGE THIS LINE to switch SMS providers
            useClass: MockSMSProvider,
            // useClass: TwilioSMSProvider, // Uncomment to use Twilio
        },
    ],
    exports: [NotificationService],
})
export class NotificationModule { }
