import "dotenv/config"
import { getPrice } from "./provider.js"
import { buildOutput } from "./buildText.js"
import { sendToTelegram } from "./notifier.js"

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
        lines.push(`⚠️ ${ticker} : indisponible`)
    }
}

await sendToTelegram(lines.join("\n"))