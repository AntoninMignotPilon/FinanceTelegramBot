import { getFollows } from "../db/db.js"

export function listCommand(ctx) {
    const tickers = getFollows(ctx.from.id)

    if (tickers.length === 0) {
        ctx.reply("Tu ne suis aucun ticker pour l'instant")
        return
    }

    ctx.reply(`Tu suis : ${tickers.join(", ")}`)
}