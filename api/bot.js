export default async function handler(req, res) {
    const { message } = req.body;

    if (message?.text) {
        const chatId = message.chat.id;
        const text = message.text;

        const gifs = [
            'https://media.giphy.com/media/l0HlNaQ6gWfllcjDO/giphy.gif',
            'https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif',
            'https://media.giphy.com/media/13GIgrGdslD9oQ/giphy.gif',
            'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
            'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif'
        ];

        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];

        await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendAnimation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                animation: randomGif,
                caption: `Echo: ${text}`
            })
        });
    }

    res.status(200).json({ ok: true });
}