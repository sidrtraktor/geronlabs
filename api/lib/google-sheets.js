import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Helper to initialize the sheet
export async function addToSheet(leadData) {
    try {
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
            console.error('Missing Google Sheets Env Vars');
            return false;
        }

        // Format private key (handle newline chars from Vercel env)
        const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: privateKey,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0]; // Write to the first sheet

        // Add headers if empty (optional safety)
        if (sheet.rowCount === 0) {
            await sheet.setHeaderRow(['Date', 'User ID', 'Name', 'Platform', 'Request', 'Status']);
        }

        const row = {
            Date: new Date().toISOString(),
            'User ID': leadData.userId || 'Unknown',
            Name: leadData.username || 'Anonymous',
            Platform: 'Telegram',
            Request: leadData.text || '',
            Status: 'New Lead'
        };

        await sheet.addRow(row);
        return true;
    } catch (error) {
        console.error('Google Sheet Error:', error);
        return false;
    }
}
