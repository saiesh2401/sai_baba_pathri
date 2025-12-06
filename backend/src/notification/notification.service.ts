import { Injectable, Inject } from '@nestjs/common';
import type { IEmailProvider, ISMSProvider, BookingConfirmationData } from './interfaces/notification-provider.interface';
import { BookingConfirmationTemplate } from './templates/booking-confirmation.template';

/**
 * Notification Service
 * 
 * This service uses a provider pattern for email and SMS integration.
 * The actual providers (Mock, Mailgun, Twilio, etc.) are injected via dependency injection.
 * 
 * To switch providers:
 * 1. Update notification.module.ts to provide different implementations
 * 2. No changes needed in this service!
 */
@Injectable()
export class NotificationService {
    constructor(
        @Inject('EMAIL_PROVIDER') private emailProvider: IEmailProvider,
        @Inject('SMS_PROVIDER') private smsProvider: ISMSProvider,
        private bookingConfirmationTemplate: BookingConfirmationTemplate,
    ) {
        console.log(`[NotificationService] Using email provider: ${this.emailProvider.getProviderName()}`);
        console.log(`[NotificationService] Using SMS provider: ${this.smsProvider.getProviderName()}`);
    }

    /**
     * Send booking confirmation notification
     */
    async sendBookingConfirmation(data: BookingConfirmationData) {
        const results = {
            email: null as any,
            sms: null as any,
        };

        // Send email if email is provided
        if (data.devotee.email) {
            try {
                results.email = await this.emailProvider.sendEmail({
                    to: data.devotee.email,
                    subject: this.bookingConfirmationTemplate.getEmailSubject(data),
                    html: this.bookingConfirmationTemplate.getEmailBody(data),
                });
                console.log('[NotificationService] Booking confirmation email sent:', results.email);
            } catch (error) {
                console.error('[NotificationService] Error sending email:', error);
                results.email = { success: false, error: error.message };
            }
        }

        // Send SMS
        try {
            results.sms = await this.smsProvider.sendSMS({
                to: data.devotee.phone,
                message: this.bookingConfirmationTemplate.getSMSBody(data),
            });
            console.log('[NotificationService] Booking confirmation SMS sent:', results.sms);
        } catch (error) {
            console.error('[NotificationService] Error sending SMS:', error);
            results.sms = { success: false, error: error.message };
        }

        return results;
    }

    /**
     * Send custom email
     */
    async sendEmail(to: string | string[], subject: string, html: string, text?: string) {
        try {
            const result = await this.emailProvider.sendEmail({
                to,
                subject,
                html,
                text,
            });
            return result;
        } catch (error) {
            console.error('[NotificationService] Error sending custom email:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Send custom SMS
     */
    async sendSMS(to: string, message: string) {
        try {
            const result = await this.smsProvider.sendSMS({
                to,
                message,
            });
            return result;
        } catch (error) {
            console.error('[NotificationService] Error sending custom SMS:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Send check-in reminder
     */
    async sendCheckInReminder(data: BookingConfirmationData) {
        const reminderMessage = `Reminder: Your seva ${data.seva.name} is scheduled for ${data.seva.date}. Booking ID: #${data.booking.id.toString().padStart(6, '0')}. Please arrive 15 minutes early. - Sai Baba Janmasthan, Pathri`;

        const results = {
            email: null as any,
            sms: null as any,
        };

        // Send email reminder
        if (data.devotee.email) {
            try {
                results.email = await this.emailProvider.sendEmail({
                    to: data.devotee.email,
                    subject: `Reminder: ${data.seva.name} - Tomorrow`,
                    html: `
            <h2>Seva Reminder</h2>
            <p>Dear ${data.devotee.name},</p>
            <p>This is a reminder that your seva <strong>${data.seva.name}</strong> is scheduled for <strong>${data.seva.date}</strong>.</p>
            <p>Booking ID: <strong>#${data.booking.id.toString().padStart(6, '0')}</strong></p>
            <p>Please arrive at the temple 15 minutes before the scheduled time.</p>
            <p>Jai Sai Nath!</p>
          `,
                });
            } catch (error) {
                console.error('[NotificationService] Error sending reminder email:', error);
            }
        }

        // Send SMS reminder
        try {
            results.sms = await this.smsProvider.sendSMS({
                to: data.devotee.phone,
                message: reminderMessage,
            });
        } catch (error) {
            console.error('[NotificationService] Error sending reminder SMS:', error);
        }

        return results;
    }
}
