import { addToSheet } from './lib/google-sheets.js';
import { getOpenAIResponse } from './lib/openai.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(200).send('Webhook Active');
    }

    try {
        const update = req.body;

        // Handle Message
        if (update.message) {
            const chatId = update.message.chat.id;
            const text = update.message.text;
            const user = update.message.from;
            const username = user.username ? `@${user.username}` : user.first_name;

            // 1. /start Command
            if (text === '/start') {
                await sendTelegramMessage(chatId,
                    `👋 <b>Приветствую, инженер.</b>\n\nЯ — цифровой ассистент Geron Labs. Я могу:\n— Принять заказ на автоматизацию\n— Или просто поболтать о том, как нейросети могут ускорить ваш бизнес.\n\nЧто выбираете?`,
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

                // Call OpenAI
                // Note: For this Stateless MVP, each message starts a new thread. 
                // To keep context, we would need a database (Redis/Postgres) to map Telegram User ID -> Thread ID.
                const aiResponse = await getOpenAIResponse(null, text, async (toolName, toolArgs) => {
                    if (toolName === 'record_lead') {
                        // Tool Logic: Add to Google Sheet
                        const success = await addToSheet({
                            userId: user.id.toString(),
                            username: username,
                            text: `[Lead Extracted] ${JSON.stringify(toolArgs)}`
                        });
                        return success;
                    }
                });

                await sendTelegramMessage(chatId, aiResponse.text);
            }
        }

        // Handle Callback Queries (Buttons)
        if (update.callback_query) {
            const chatId = update.callback_query.message.chat.id;
            const data = update.callback_query.data;

            if (data === 'start_chat') {
                await sendTelegramMessage(chatId, "Отлично. Расскажите, чем вы занимаетесь? Где теряете больше всего времени? Я попробую предложить решение.");
            }

            // Acknowledge callback
            await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ callback_query_id: update.callback_query.id })
            });
        }

        return res.status(200).json({ ok: true });

    } catch (error) {
        console.error('Webhook Error:', error);
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

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
}

async function sendTelegramAction(chatId, action) {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendChatAction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, action: action })
    });
}
