import { getAllUsers, getFollows } from "../db/db.js"
import { getPrice } from "./provider.js"
import { buildOutput } from "./buildText.js"
import { sendToTelegram } from "../telegram/notifier.js"

export async function sendDigests() {
    const users = getAllUsers()
    for (const userId of users) {
        const tickers = getFollows(userId)
        if (tickers.length === 0) continue
        const lines = []
        for (const ticker of tickers) {
            try {
                const data = await getPrice(ticker)
                lines.push(buildOutput(ticker, data))
            } catch (e) {
                lines.push(`⚠️ ${ticker} : indisponible`)
            }
        }
        await sendToTelegram(userId, lines.join("\n"))
    }
}
