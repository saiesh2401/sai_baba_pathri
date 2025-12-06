import { Injectable } from '@nestjs/common';
import {
    IEmailProvider,
    SendEmailParams,
    EmailResponse,
} from '../interfaces/notification-provider.interface';

/**
 * Mailgun Email Provider
 * 
 * To enable this provider:
 * 1. Install Mailgun SDK: npm install mailgun.js form-data
 * 2. Add credentials to .env:
 *    MAILGUN_API_KEY=your_api_key
 *    MAILGUN_DOMAIN=your_domain
 *    MAILGUN_FROM_EMAIL=noreply@your_domain.com
 * 3. Update notification.module.ts to use MailgunEmailProvider
 * 4. Uncomment the code below
 * 
 * Documentation: https://documentation.mailgun.com/en/latest/
 */
@Injectable()
export class MailgunEmailProvider implements IEmailProvider {
    // Uncomment when ready to use
    // private mailgun: any;

    constructor() {
        // Uncomment when Mailgun SDK is installed
        // const formData = require('form-data');
        // const Mailgun = require('mailgun.js');
        // const mailgun = new Mailgun(formData);

        // this.mailgun = mailgun.client({
        //   username: 'api',
        //   key: process.env.MAILGUN_API_KEY,
        // });
    }

    getProviderName(): string {
        return 'Mailgun';
    }

    async sendEmail(params: SendEmailParams): Promise<EmailResponse> {
        // Uncomment when ready
        // try {
        //   const messageData: any = {
        //     from: params.from || process.env.MAILGUN_FROM_EMAIL,
        //     to: Array.isArray(params.to) ? params.to.join(',') : params.to,
        //     subject: params.subject,
        //   };

        //   if (params.html) {
        //     messageData.html = params.html;
        //   }

        //   if (params.text) {
        //     messageData.text = params.text;
        //   }

        //   if (params.cc) {
        //     messageData.cc = Array.isArray(params.cc) ? params.cc.join(',') : params.cc;
        //   }

        //   if (params.bcc) {
        //     messageData.bcc = Array.isArray(params.bcc) ? params.bcc.join(',') : params.bcc;
        //   }

        //   if (params.attachments) {
        //     messageData.attachment = params.attachments.map(att => ({
        //       filename: att.filename,
        //       data: att.content,
        //     }));
        //   }

        //   const result = await this.mailgun.messages.create(
        //     process.env.MAILGUN_DOMAIN,
        //     messageData
        //   );

        //   return {
        //     success: true,
        //     messageId: result.id,
        //   };
        // } catch (error) {
        //   console.error('[MailgunEmailProvider] Error sending email:', error);
        //   return {
        //     success: false,
        //     error: error.message,
        //   };
        // }

        throw new Error('Mailgun provider not configured. Please install SDK and add credentials.');
    }
}
