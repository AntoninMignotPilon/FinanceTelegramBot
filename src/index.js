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

const index = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)

index.start(helpCommand)
index.help(helpCommand)
index.command("follow", followCommand)
index.command("list", listCommand)
index.command("unfollow", unfollowCommand)

index.launch().catch(e => console.error("LAUNCH FAIL:", e))
console.log("Bot launching...")

// Arrêt propre : ferme la connexion Telegram quand le index est stoppé
process.once("SIGINT", () => index.stop("SIGINT"))
process.once("SIGTERM", () => index.stop("SIGTERM"))