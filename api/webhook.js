import { addToSheet } from './lib/google-sheets.js';
import { getOpenAIResponse } from './lib/openai.js';

export default async function handler(req, res) {
    console.log('🔔 Webhook called:', new Date().toISOString());
    console.log('📨 Method:', req.method);

    if (req.method !== 'POST') {
        return res.status(200).send('Webhook Active');
    }

    try {
        const update = req.body;
        console.log('📦 Update received:', JSON.stringify(update, null, 2));

        // Handle Message
        if (update.message) {
            const chatId = update.message.chat.id;
            const text = update.message.text;
            const user = update.message.from;
            const username = user.username ? `@${user.username}` : user.first_name;

            console.log(`👤 User ${user.id}: ${text}`);

            // 1. /start Command
            if (text === '/start') {
                await sendTelegramMessage(chatId,
                    `Готов к общению.`,
                    {
                        inline_keyboard: [
                            [{ text: "⚡ Оформить заказ (Web)", web_app: { url: "https://geronlabs.xyz/tg-order" } }],
                            [{ text: "🤖 Поговорить с AI-Инженером", callback_data: "start_chat" }]
                        ]
                    }
                );
                return res.status(200).json({ ok: true });
            }

            // 2. Regular Text (Chat with AI)
            if (text) {
                // Send "Typing..." action
                await sendTelegramAction(chatId, 'typing');

                try {
                    // Call OpenAI with timeout protection
                    console.log('🤖 Calling OpenAI...');
                    const aiResponse = await Promise.race([
                        getOpenAIResponse(user.id, text, async (toolName, toolArgs) => {
                            if (toolName === 'record_lead') {
                                console.log('📝 Recording lead:', toolArgs);
                                try {
                                    const success = await addToSheet({
                                        userId: user.id.toString(),
                                        username: username,
                                        text: `[Lead Extracted] ${JSON.stringify(toolArgs)}`
                                    });
                                    console.log('✅ Lead recorded:', success);
                                    return success;
                                } catch (sheetError) {
                                    console.error('❌ Google Sheets Error:', sheetError);
                                    return false;
                                }
                            }
                        }),
                        new Promise((_, reject) =>
                            setTimeout(() => reject(new Error('OpenAI timeout (60s)')), 60000)
                        )
                    ]);

                    console.log('✅ OpenAI response received');
                    await sendTelegramMessage(chatId, aiResponse.text);

                } catch (aiError) {
                    console.error('❌ AI Error:', aiError);
                    await sendTelegramMessage(chatId,
                        '⚠️ Временная ошибка AI. Попробуйте позже или напишите нам: team@geronlabs.xyz'
                    );
                }
            }
        }

        // Handle Callback Queries (Buttons)
        if (update.callback_query) {
            const chatId = update.callback_query.message.chat.id;
            const data = update.callback_query.data;

            console.log('🔘 Callback:', data);

            if (data === 'start_chat') {
                await sendTelegramMessage(chatId, "Отлично. Расскажите, чем вы занимаетесь? Где теряете больше всего времени? Я попробую предложить решение.");
            }

            // Acknowledge callback
            const ackResponse = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: update.callback_query.id })
            });

            if (!ackResponse.ok) {
                const body = await ackResponse.json();
                console.error('❌ Callback Ack Error:', body);
            }
        }

        console.log('✅ Webhook processed successfully');
        return res.status(200).json({ ok: true });

    } catch (error) {
        console.error('💥 Webhook Critical Error:', error);
        console.error('Stack:', error.stack);
        return res.status(500).json({ error: error.message });
    }
}


// Helpers
async function sendTelegramMessage(chatId, text, replyMarkup = null) {
    const body = {
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
    };
    if (replyMarkup) body.reply_markup = replyMarkup;

    console.log('📤 Sending message to', chatId);

    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    const responseBody = await response.json();

    if (!response.ok) {
        console.error('❌ Telegram sendMessage Error:', responseBody);
        throw new Error(`Telegram API: ${responseBody.description || 'Unknown error'}`);
    }

    console.log('✅ Message sent successfully');
    return responseBody;
}

async function sendTelegramAction(chatId, action) {
    console.log(`⌨️ Sending action "${action}" to`, chatId);

    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendChatAction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, action: action })
    });

    if (!response.ok) {
        const body = await response.json();
        console.error('❌ Telegram sendChatAction Error:', body);
    }
}
