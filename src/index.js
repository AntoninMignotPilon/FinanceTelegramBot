import "dotenv/config"
import { getPrice } from "./services/provider.js"
import { buildOutput } from "./services/buildText.js"
import { sendToTelegram } from "./telegram/notifier.js"

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