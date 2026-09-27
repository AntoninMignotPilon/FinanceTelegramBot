import { addFollow } from "../db/db.js"

export function followCommand(ctx) {
    const parts = ctx.message.text.split(" ")
    const ticker = parts[1]

    if (!ticker) {
        ctx.reply("Utilise : /follow TICKER (ex: /follow AAPL)")
        return
    }

    addFollow(ctx.from.id, ticker.toUpperCase())
    ctx.reply(`Tu suis maintenant ${ticker.toUpperCase()}`)
}