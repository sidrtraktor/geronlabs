// api/send-message.js
export default async function handler(req, res) {
    if (req.method!== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;
    const token = '7590833251:AAH22_JFeFB-EeHcS9VErolXVIxtwqZwWWE';
    const chatId = '61532886';
    const text = `🚀 Новая заявка на Geron Labs!\nEmail: ${email}`;

    try {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: text })
        });

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(500).json({ success: false });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
