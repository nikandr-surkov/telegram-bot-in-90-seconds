# Telegram Bot in 90 Seconds 🚀

Build and deploy a serverless Telegram bot that responds with random GIFs in just 90 seconds! This bot runs on Vercel's serverless infrastructure and requires zero server management.

## 🎥 Video Tutorial

Watch the full video tutorial showing the entire process in 90 seconds: https://www.youtube.com/watch?v=RpnaMaL3Kog

## ✨ Features

- **Serverless Architecture** - Runs on Vercel, no server required
- **Echo Messages** - Responds to every message with an echo
- **Random GIFs** - Sends a random cat GIF with each response
- **Quick Setup** - Deploy in under 2 minutes
- **Free Hosting** - Uses Vercel's free tier

## 📋 Prerequisites

- Node.js installed on your machine
- A Telegram account
- A Vercel account (free)
- Git (optional, for cloning)

## 🛠️ Quick Setup

### Step 1: Clone or Create the Project

```bash
# Clone this repository
git clone https://github.com/nikandr-surkov/telegram-bot-in-90-seconds.git
cd telegram-bot-in-90-seconds

# OR create from scratch
mkdir telegram-bot-in-90-seconds
cd telegram-bot-in-90-seconds
npm init -y
```

### Step 2: Create the Bot Files

If creating from scratch, create these files:

**`api/bot.js`** - The main bot handler:
```javascript
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
```

**`vercel.json`** - Vercel configuration:
```json
{
    "functions": {
        "api/bot.js": {
            "maxDuration": 10
        }
    }
}
```

### Step 3: Create Your Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Choose a name for your bot (e.g., "My Echo Bot")
4. Choose a username for your bot (must end with 'bot', e.g., `myecho_bot`)
5. Copy the bot token that BotFather gives you

### Step 4: Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy your bot:
```bash
vercel --prod
```

Follow the prompts:
- Setup and deploy: `Y`
- Which scope: Select your account
- Link to existing project: `N` 
- Project name: Press Enter (or choose a name)
- Directory: Press Enter (current directory)

### Step 5: Add Environment Variable

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name:** `BOT_TOKEN`
   - **Value:** Your bot token from BotFather
5. Click **Save**

### Step 6: Redeploy

After adding the environment variable, redeploy:
```bash
vercel --prod
```

Copy the production URL (e.g., `https://your-project.vercel.app`)

### Step 7: Set Up Webhook

Tell Telegram where to send updates. Replace `YOUR_BOT_TOKEN` and `YOUR_VERCEL_URL`:

```bash
curl -X POST "https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url": "YOUR_VERCEL_URL/api/bot"}'
```

You should see:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

## 🎉 Test Your Bot

1. Open Telegram
2. Search for your bot by its username
3. Start a conversation and send any message
4. Your bot will echo your message with a random GIF!

## 📁 Project Structure

```
telegram-bot-in-90-seconds/
├── api/
│   └── bot.js          # Main bot handler
├── .env.example        # Example environment variables
├── package.json        # Node.js project file
├── vercel.json         # Vercel configuration
└── README.md          # This file
```

## 🔧 How It Works

1. **Webhook**: Telegram sends updates to your Vercel URL
2. **Handler**: The `bot.js` function processes incoming messages
3. **Response**: Bot sends back a random GIF with echoed text
4. **Serverless**: Function runs on-demand, no server maintenance needed

## Author
### Nikandr Surkov
- 🌐 Website: https://nikandr.com
- 📺 YouTube: https://www.youtube.com/@NikandrSurkov
- 📢 Telegram Channel: https://t.me/NikandrApps
- 📱 Telegram: https://t.me/nikandr_s
- 💻 GitHub: https://github.com/nikandr-surkov
- 🐦 Twitter: https://x.com/NikandrSurkov
- 💼 LinkedIn: https://www.linkedin.com/in/nikandr-surkov/
- ✍️ Medium: https://medium.com/@NikandrSurkov

---

Built with ❤️ for the Telegram developer community
