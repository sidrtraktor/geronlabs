// Упрощенная версия для отладки
export default async function handler(req, res) {
    console.log('🔔 Webhook Triggered:', new Date().toISOString());
    console.log('📨 Method:', req.method);
    console.log('🔑 Bot Token Set:', !!process.env.TELEGRAM_BOT_TOKEN);

    if (req.method !== 'POST') {
        console.log('⚠️ Non-POST request');
        return res.status(200).send('Webhook Active (Debug Mode)');
    }

    try {
        const update = req.body;
        console.log('📦 Update Body:', JSON.stringify(update, null, 2));

        // Простое эхо для любого сообщения
        if (update.message) {
            const chatId = update.message.chat.id;
            const text = update.message.text || '[No Text]';
            const user = update.message.from;

            console.log(`👤 User: ${user.id} (${user.username || user.first_name})`);
            console.log(`💬 Message: ${text}`);
            console.log(`📍 Chat: ${chatId}`);

            // Отправляем эхо
            const response = `✅ Получено: "${text}"\n\n🔧 Debug Info:\nUser ID: ${user.id}\nChat ID: ${chatId}\nTime: ${new Date().toISOString()}`;

            console.log('📤 Sending response...');
            const telegramResponse = await fetch(
                `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: response,
                        parse_mode: 'HTML'
                    })
                }
            );

            const telegramBody = await telegramResponse.json();
            console.log('📬 Telegram API Response:', JSON.stringify(telegramBody, null, 2));

            if (!telegramResponse.ok) {
                console.error('❌ Telegram API Error:', telegramBody);
                return res.status(500).json({ error: 'Telegram API Failed', details: telegramBody });
            }

            console.log('✅ Message Sent Successfully');
        }

        // Обработка callback_query
        if (update.callback_query) {
            console.log('🔘 Callback Query:', update.callback_query.data);
            await fetch(
                `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ callback_query_id: update.callback_query.id })
                }
            );
        }

        console.log('✅ Webhook Processed');
        return res.status(200).json({ ok: true, debug: true });

    } catch (error) {
        console.error('💥 Webhook Error:', error);
        console.error('Stack:', error.stack);
        return res.status(500).json({
            error: error.message,
            stack: error.stack,
            time: new Date().toISOString()
        });
    }
}
