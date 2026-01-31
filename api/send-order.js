export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, contact, task } = req.body;

    // Load secrets from Environment Variables (Vercel)
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.error('Missing Telegram Environment Variables');
        return res.status(500).json({ error: 'Server Configuration Error' });
    }

    // Format the message
    const text = `
⚡ <b>ЗАКАЗ АВТОМАТИЗАЦИИ</b> ⚡
--------------------------
👤 <b>Имя:</b> ${name}
📱 <b>Контакт:</b> ${contact}
📝 <b>Тех. Задание:</b> 
<pre>${task}</pre>
--------------------------
[SYSTEM_INIT_SIGNAL]
`;

    try {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json({ success: true, data });
        } else {
            console.error('Telegram API Error:', data);
            return res.status(500).json({ error: data.description || 'Telegram API Error' });
        }
    } catch (error) {
        console.error('Server Internal Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
