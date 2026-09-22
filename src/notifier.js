import "dotenv/config"

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
const telegramChatToken = process.env.TELEGRAM_CHAT_TOKEN

const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`

async function sendToTelegram(message){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: telegramChatToken,
            text: message,
        })
    })
    if(!response.ok){
        const error  = await response.json()
        console.error("Telegram error:", error)
    }
    return response
}