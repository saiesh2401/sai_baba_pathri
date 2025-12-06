import { Injectable } from '@nestjs/common';

@Injectable()
export class ExportService {
    convertToCSV(data: any[], headers: string[]): string {
        if (!data || data.length === 0) {
            return '';
        }

        // Create header row
        const headerRow = headers.join(',');

        // Create data rows
        const dataRows = data.map(item => {
            return headers.map(header => {
                const value = this.getNestedValue(item, header);
                // Escape commas and quotes in values
                if (value === null || value === undefined) {
                    return '';
                }
                const stringValue = String(value);
                if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                    return `"${stringValue.replace(/"/g, '""')}"`;
                }
                return stringValue;
            }).join(',');
        });

        return [headerRow, ...dataRows].join('\n');
    }

    private getNestedValue(obj: any, path: string): any {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    formatBookingsForCSV(bookings: any[]) {
        return bookings.map(booking => ({
            'Booking ID': booking.id,
            'Devotee Name': booking.devotee?.name || '',
            'Phone': booking.devotee?.phone || '',
            'Email': booking.devotee?.email || '',
            'Seva': booking.seva?.name || '',
            'Booking Date': new Date(booking.bookingDate).toLocaleDateString(),
            'Amount': booking.amount,
            'Payment Status': booking.paymentStatus,
            'Payment ID': booking.paymentId || '',
            'Checked In': booking.checkedIn ? 'Yes' : 'No',
            'Pooja Completed': booking.poojaCompleted ? 'Yes' : 'No',
            'Created At': new Date(booking.createdAt).toLocaleString(),
        }));
    }

    formatDonationsForCSV(donations: any[]) {
        return donations.map(donation => ({
            'Donation ID': donation.id,
            'Donor Name': donation.donorName,
            'Phone': donation.donorPhone,
            'Email': donation.donorEmail || '',
            'Amount': donation.amount,
            'Purpose': donation.purpose,
            'PAN Number': donation.panNumber || '',
            'Payment Status': donation.paymentStatus,
            'Receipt Number': donation.receiptNumber || '',
            'Created At': new Date(donation.createdAt).toLocaleString(),
        }));
    }
}
