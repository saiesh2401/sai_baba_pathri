# Plug-and-Play Service Integration Guide

This document explains how to easily integrate payment gateways and notification services into the Sai Baba Pathri temple management system.

## 🎯 Overview

The system uses a **provider pattern** for both payment and notification services. This means you can easily switch between different service providers (Mock, Razorpay, Mailgun, Twilio, etc.) by changing just ONE line of code and adding credentials.

---

## 💳 Payment Gateway Integration

### Current Setup
- **Provider:** Mock Payment Gateway (for development/testing)
- **Location:** `backend/src/payment/providers/mock-payment.provider.ts`

### Available Providers

#### 1. Razorpay (Recommended for India)

**Step 1:** Install SDK
```bash
cd backend
npm install razorpay
```

**Step 2:** Add credentials to `.env`
```env
RAZORPAY_KEY_ID=your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
```

**Step 3:** Enable the provider

Open `backend/src/payment/payment.module.ts` and change line 37:

```typescript
// FROM:
useClass: MockPaymentProvider,

// TO:
useClass: RazorpayPaymentProvider,
```

Also uncomment the import at the top:
```typescript
import { RazorpayPaymentProvider } from './providers/razorpay-payment.provider';
```

**Step 4:** Uncomment the code in `razorpay-payment.provider.ts`

Open `backend/src/payment/providers/razorpay-payment.provider.ts` and uncomment all the code blocks.

**Step 5:** Restart the server
```bash
npm run start:dev
```

**That's it!** Your payment gateway is now live.

#### 2. Adding Other Payment Gateways (PayU, CCAvenue, etc.)

Create a new provider file implementing the `IPaymentProvider` interface:

```typescript
// backend/src/payment/providers/your-gateway.provider.ts
import { Injectable } from '@nestjs/common';
import { IPaymentProvider, CreateOrderParams, PaymentOrder, ... } from '../interfaces/payment-provider.interface';

@Injectable()
export class YourGatewayProvider implements IPaymentProvider {
  getProviderName(): string {
    return 'Your Gateway Name';
  }

  async createOrder(params: CreateOrderParams): Promise<PaymentOrder> {
    // Your implementation
  }

  // Implement other methods...
}
```

Then update `payment.module.ts` to use your provider.

---

## 📧 Email Service Integration

### Current Setup
- **Provider:** Mock Email Service (logs to console)
- **Location:** `backend/src/notification/providers/mock-email.provider.ts`

### Available Providers

#### 1. Mailgun (Recommended)

**Step 1:** Install SDK
```bash
cd backend
npm install mailgun.js form-data
```

**Step 2:** Add credentials to `.env`
```env
MAILGUN_API_KEY=your_api_key_here
MAILGUN_DOMAIN=your_domain_here
MAILGUN_FROM_EMAIL=noreply@your_domain.com
```

**Step 3:** Enable the provider

Open `backend/src/notification/notification.module.ts` and change line 44:

```typescript
// FROM:
useClass: MockEmailProvider,

// TO:
useClass: MailgunEmailProvider,
```

Also uncomment the import at the top:
```typescript
import { MailgunEmailProvider } from './providers/mailgun-email.provider';
```

**Step 4:** Uncomment the code in `mailgun-email.provider.ts`

Open `backend/src/notification/providers/mailgun-email.provider.ts` and uncomment all the code blocks.

**Step 5:** Restart the server
```bash
npm run start:dev
```

#### 2. SendGrid

Similar process - create a provider implementing `IEmailProvider` interface.

---

## 📱 SMS Service Integration

### Current Setup
- **Provider:** Mock SMS Service (logs to console)
- **Location:** `backend/src/notification/providers/mock-sms.provider.ts`

### Available Providers

#### 1. Twilio (Recommended)

**Step 1:** Install SDK
```bash
cd backend
npm install twilio
```

**Step 2:** Add credentials to `.env`
```env
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_number_here
```

**Step 3:** Enable the provider

Open `backend/src/notification/notification.module.ts` and change line 50:

```typescript
// FROM:
useClass: MockSMSProvider,

// TO:
useClass: TwilioSMSProvider,
```

Also uncomment the import at the top:
```typescript
import { TwilioSMSProvider } from './providers/twilio-sms.provider';
```

**Step 4:** Uncomment the code in `twilio-sms.provider.ts`

Open `backend/src/notification/providers/twilio-sms.provider.ts` and uncomment all the code blocks.

**Step 5:** Restart the server
```bash
npm run start:dev
```

#### 2. Textlocal (India-specific)

Create a provider implementing `ISMSProvider` interface using Textlocal's REST API.

---

## 🧪 Testing

### With Mock Providers (Current Setup)

All notifications are logged to the console. Check your terminal to see:
- Email content (HTML and text)
- SMS messages
- Payment order details

### With Real Providers

1. **Test Mode:** Most providers offer test credentials
   - Razorpay: Test mode keys
   - Mailgun: Sandbox domain
   - Twilio: Test credentials

2. **Verify Integration:**
   - Create a test booking
   - Check if email/SMS is received
   - Verify payment flow works

---

## 📝 Notification Templates

Templates are located in `backend/src/notification/templates/`

### Booking Confirmation Template

**File:** `booking-confirmation.template.ts`

**Customize:**
- Email subject
- Email HTML body
- SMS message text

**Example:**
```typescript
getEmailSubject(data: BookingConfirmationData): string {
  return `Booking Confirmed - ${data.seva.name} | Your Temple Name`;
}
```

### Adding New Templates

1. Create a new template file implementing `NotificationTemplate` interface
2. Inject it in `notification.service.ts`
3. Use it in your notification methods

---

## 🔄 Switching Providers

### Summary

| Service | File to Edit | Line to Change |
|---------|-------------|----------------|
| Payment | `payment.module.ts` | Line 37 |
| Email | `notification.module.ts` | Line 44 |
| SMS | `notification.module.ts` | Line 50 |

**Remember:** After changing providers, restart the server!

---

## 🚀 Production Checklist

Before going live:

- [ ] Replace Mock providers with real providers
- [ ] Add all credentials to `.env` file
- [ ] Test payment flow end-to-end
- [ ] Test email delivery
- [ ] Test SMS delivery
- [ ] Verify webhook handling
- [ ] Set up monitoring for failed notifications
- [ ] Configure proper "from" addresses/numbers
- [ ] Test refund flow (if applicable)

---

## 🆘 Troubleshooting

### Payment Issues

**Problem:** "Provider not configured" error  
**Solution:** Make sure you've uncommented the code in the provider file

**Problem:** Invalid signature  
**Solution:** Check that your secret key is correct in `.env`

### Email Issues

**Problem:** Emails not sending  
**Solution:** Verify API key and domain in `.env`

**Problem:** Emails going to spam  
**Solution:** Configure SPF, DKIM, and DMARC records for your domain

### SMS Issues

**Problem:** SMS not delivering  
**Solution:** Check phone number format (must include country code)

**Problem:** Invalid credentials  
**Solution:** Verify account SID and auth token

---

## 📚 Provider Documentation Links

- **Razorpay:** https://razorpay.com/docs/api/
- **Mailgun:** https://documentation.mailgun.com/
- **Twilio:** https://www.twilio.com/docs/sms
- **SendGrid:** https://docs.sendgrid.com/
- **Textlocal:** https://www.textlocal.in/documentation/

---

## 💡 Best Practices

1. **Always test in sandbox/test mode first**
2. **Keep credentials in `.env` file, never commit them**
3. **Monitor notification delivery rates**
4. **Set up retry logic for failed notifications**
5. **Log all notification attempts for debugging**
6. **Use templates for consistent messaging**
7. **Test email rendering across different clients**
8. **Verify SMS character limits (160 chars for single SMS)**

---

**Need help?** Check the provider documentation or create an issue in the repository.

**Jai Sai Nath! 🙏**
