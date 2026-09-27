import { removeFollow } from "../db/db.js"

export function unfollowCommand(ctx) {
    const parts = ctx.message.text.split(" ")
    const ticker = parts[1]

    if (!ticker) {
        ctx.reply("Utilise : /unfollow TICKER (ex: /unfollow AAPL)")
        return
    }

    const supprime = removeFollow(ctx.from.id, ticker.toUpperCase())

    if (supprime) {
        ctx.reply(`Tu t'es désabonné de ${ticker.toUpperCase()}`)
    } else {
        ctx.reply(`Tu ne suivais pas ${ticker.toUpperCase()}`)
    }
}