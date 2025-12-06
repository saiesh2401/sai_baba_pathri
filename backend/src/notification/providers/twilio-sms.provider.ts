import { Injectable } from '@nestjs/common';
import {
    ISMSProvider,
    SendSMSParams,
    SMSResponse,
} from '../interfaces/notification-provider.interface';

/**
 * Twilio SMS Provider
 * 
 * To enable this provider:
 * 1. Install Twilio SDK: npm install twilio
 * 2. Add credentials to .env:
 *    TWILIO_ACCOUNT_SID=your_account_sid
 *    TWILIO_AUTH_TOKEN=your_auth_token
 *    TWILIO_PHONE_NUMBER=your_twilio_number
 * 3. Update notification.module.ts to use TwilioSMSProvider
 * 4. Uncomment the code below
 * 
 * Documentation: https://www.twilio.com/docs/sms
 */
@Injectable()
export class TwilioSMSProvider implements ISMSProvider {
    // Uncomment when ready to use
    // private twilioClient: any;

    constructor() {
        // Uncomment when Twilio SDK is installed
        // const twilio = require('twilio');
        // this.twilioClient = twilio(
        //   process.env.TWILIO_ACCOUNT_SID,
        //   process.env.TWILIO_AUTH_TOKEN
        // );
    }

    getProviderName(): string {
        return 'Twilio';
    }

    async sendSMS(params: SendSMSParams): Promise<SMSResponse> {
        // Uncomment when ready
        // try {
        //   const message = await this.twilioClient.messages.create({
        //     body: params.message,
        //     from: params.from || process.env.TWILIO_PHONE_NUMBER,
        //     to: params.to,
        //   });

        //   return {
        //     success: true,
        //     messageId: message.sid,
        //   };
        // } catch (error) {
        //   console.error('[TwilioSMSProvider] Error sending SMS:', error);
        //   return {
        //     success: false,
        //     error: error.message,
        //   };
        // }

        throw new Error('Twilio provider not configured. Please install SDK and add credentials.');
    }
}
