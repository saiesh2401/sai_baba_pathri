// Notification Provider Interfaces
export interface IEmailProvider {
    sendEmail(params: SendEmailParams): Promise<EmailResponse>;
    getProviderName(): string;
}

export interface ISMSProvider {
    sendSMS(params: SendSMSParams): Promise<SMSResponse>;
    getProviderName(): string;
}

export interface SendEmailParams {
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    from?: string;
    cc?: string | string[];
    bcc?: string | string[];
    attachments?: EmailAttachment[];
}

export interface EmailAttachment {
    filename: string;
    content: Buffer | string;
    contentType?: string;
}

export interface EmailResponse {
    success: boolean;
    messageId?: string;
    error?: string;
}

export interface SendSMSParams {
    to: string; // Phone number with country code
    message: string;
    from?: string; // Sender ID
}

export interface SMSResponse {
    success: boolean;
    messageId?: string;
    error?: string;
}

// Notification Templates
export interface BookingConfirmationData {
    devotee: {
        name: string;
        phone: string;
        email?: string;
    };
    seva: {
        name: string;
        date: string;
    };
    booking: {
        id: number;
        amount: number;
        paymentStatus: string;
    };
}

export interface NotificationTemplate {
    getEmailSubject(data: any): string;
    getEmailBody(data: any): string;
    getSMSBody(data: any): string;
}
