import "dotenv/config"

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`

export async function sendToTelegram(chatId, message){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        })
    })
    if(!response.ok){
        const error  = await response.json()
        console.error("Telegram error:", error)
    }
    return response
}