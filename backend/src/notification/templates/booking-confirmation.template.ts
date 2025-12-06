import { Injectable } from '@nestjs/common';
import {
    BookingConfirmationData,
    NotificationTemplate,
} from '../interfaces/notification-provider.interface';

/**
 * Booking Confirmation Template
 * 
 * Generates email and SMS content for booking confirmations
 */
@Injectable()
export class BookingConfirmationTemplate implements NotificationTemplate {
    getEmailSubject(data: BookingConfirmationData): string {
        return `Booking Confirmed - ${data.seva.name} | Sai Baba Janmasthan, Pathri`;
    }

    getEmailBody(data: BookingConfirmationData): string {
        const { devotee, seva, booking } = data;

        return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .booking-card { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #ff6b35; border-radius: 5px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .label { font-weight: bold; color: #666; }
    .value { color: #333; }
    .amount { font-size: 24px; color: #ff6b35; font-weight: bold; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    .button { display: inline-block; background: #ff6b35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🙏 Jai Sai Nath!</h1>
      <p>Your booking has been confirmed</p>
    </div>
    
    <div class="content">
      <p>Dear ${devotee.name},</p>
      
      <p>Thank you for booking a seva at Sai Baba Janmasthan, Pathri. Your booking has been successfully confirmed.</p>
      
      <div class="booking-card">
        <h3 style="margin-top: 0; color: #ff6b35;">Booking Details</h3>
        
        <div class="detail-row">
          <span class="label">Booking ID:</span>
          <span class="value">#${booking.id.toString().padStart(6, '0')}</span>
        </div>
        
        <div class="detail-row">
          <span class="label">Seva:</span>
          <span class="value">${seva.name}</span>
        </div>
        
        <div class="detail-row">
          <span class="label">Date:</span>
          <span class="value">${seva.date}</span>
        </div>
        
        <div class="detail-row">
          <span class="label">Amount:</span>
          <span class="amount">₹${booking.amount.toLocaleString()}</span>
        </div>
        
        <div class="detail-row">
          <span class="label">Payment Status:</span>
          <span class="value" style="color: ${booking.paymentStatus === 'PAID' ? 'green' : 'orange'};">
            ${booking.paymentStatus}
          </span>
        </div>
      </div>
      
      <h3>What's Next?</h3>
      <ol>
        <li>Please arrive at the temple on ${seva.date}</li>
        <li>Show your booking ID at the counter: <strong>#${booking.id.toString().padStart(6, '0')}</strong></li>
        <li>Complete the check-in process</li>
        <li>Participate in the seva and receive blessings</li>
      </ol>
      
      <p style="text-align: center;">
        <a href="http://localhost:3001/booking-confirmation?id=${booking.id}" class="button">
          View Booking Details
        </a>
      </p>
      
      <p><strong>Temple Contact:</strong><br>
      📞 +91 XXXXX XXXXX<br>
      ✉️ info@saibaba-pathri.org</p>
      
      <p>May Sai Baba's blessings be with you always!</p>
    </div>
    
    <div class="footer">
      <p>Sai Baba Janmasthan, Pathri, Maharashtra</p>
      <p>This is an automated email. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
    `;
    }

    getSMSBody(data: BookingConfirmationData): string {
        const { devotee, seva, booking } = data;

        return `Jai Sai Nath! Dear ${devotee.name}, your booking for ${seva.name} on ${seva.date} is confirmed. Booking ID: #${booking.id.toString().padStart(6, '0')}. Amount: Rs.${booking.amount}. Status: ${booking.paymentStatus}. - Sai Baba Janmasthan, Pathri`;
    }
}
