import "dotenv/config"
import cron from "node-cron"
import { Telegraf } from "telegraf"
import {helpCommand} from "./commands/help.js";
import {followCommand} from "./commands/follow.js";
import {listCommand} from "./commands/list.js";
import {unfollowCommand} from "./commands/unfollow.js";
import {sendDigests} from "./services/digest.js";

cron.schedule("0 19 * * *", async () => {
    try {
        await sendDigests()
    } catch (e) {
        console.error("Erreur digest:", e)
    }
}, { timezone: "Europe/Paris" })

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)

bot.start(helpCommand)
bot.help(helpCommand)
bot.command("follow", followCommand)
bot.command("list", listCommand)
bot.command("unfollow", unfollowCommand)

bot.launch()
console.log("Bot started...")

// Arrêt propre : ferme la connexion Telegram quand le bot est stoppé
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))