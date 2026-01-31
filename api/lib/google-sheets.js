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

        console.log('📊 Google Sheet loaded:', doc.title);
        console.log('📑 Available sheets:', doc.sheetsByIndex.map(s => s.title).join(', '));

        // Find sheet named "ORDER" or create it
        let sheet = doc.sheetsByTitle['ORDER'];
        if (!sheet) {
            console.log('⚠️ Sheet "ORDER" not found, creating...');
            sheet = await doc.addSheet({ title: 'ORDER', headerValues: ['Date', 'User ID', 'Name', 'Platform', 'Request', 'Status'] });
        }

        console.log('✅ Using sheet:', sheet.title);

        // Установить заголовки (безопасно даже если они уже есть)
        try {
            console.log('📝 Setting headers...');
            await sheet.setHeaderRow(['Date', 'User ID', 'Name', 'Platform', 'Request', 'Status']);
            console.log('✅ Headers set');
        } catch (headerError) {
            console.log('⚠️ Headers already exist or error:', headerError.message);
        }

        // Теперь загружаем заголовки
        await sheet.loadHeaderRow();
        console.log('📋 Headers:', sheet.headerValues);

        const row = {
            Date: new Date().toISOString(),
            'User ID': leadData.userId || 'Unknown',
            Name: leadData.username || 'Anonymous',
            Platform: 'Telegram',
            Request: leadData.text || '',
            Status: 'New Lead'
        };

        await sheet.addRow(row);
        console.log('✅ Row added to ORDER:', row);
        return true;
    } catch (error) {
        console.error('❌ Google Sheet Error:', error.message);
        console.error('📋 Error Details:', {
            name: error.name,
            code: error.code,
            status: error.status,
            message: error.message
        });
        if (error.response) {
            console.error('🔍 API Response:', error.response.data);
        }
        return false;
    }
}
