import "dotenv/config"
import { getPrice } from "./provider.js"
import { buildOutput } from "./buildText.js"
import { sendToTelegram } from "./notifier.js"

console.log("token length:", (process.env.TELEGRAM_BOT_TOKEN || "").length)
console.log("chat length:", (process.env.TELEGRAM_CHAT_TOKEN || "").length)
console.log("tickers:", process.env.TRACKED_TICKERS)

function getTickers() {
    return process.env.TRACKED_TICKERS.split(",").map(t => t.trim())
}

const tickers = getTickers()
const lines = []

for (const ticker of tickers) {
    try {
        const data = await getPrice(ticker)
        lines.push(buildOutput(ticker, data))
    } catch (e) {
        lines.push(`⚠️ ${ticker} : not found`)
    }
}

await sendToTelegram(lines.join("\n"))