export function helpCommand(ctx) {
    const message = "Je t'envoie chaque jour à 19h un récap des actions et ETF que tu suis (prix + variation).\n\n/follow TICKER — ajouter un titre (ex: /follow AAPL)\n/unfollow TICKER — en retirer un\n/list — voir ta liste\n/help — réafficher ce message\n\nCommence par /follow pour ajouter un titre."
    ctx.reply(message)
}