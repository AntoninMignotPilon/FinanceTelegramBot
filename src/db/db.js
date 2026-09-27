import { DatabaseSync } from "node:sqlite"
const dbPath = process.env.DB_PATH || "data.db"
const db = new DatabaseSync(dbPath)
db.exec(`
    CREATE TABLE IF NOT EXISTS subscriptions (
        user_id INTEGER,
        ticker TEXT,
        UNIQUE(user_id, ticker)
    )
`)

export function addFollow(user_id, ticker) {
    const insertion = db.prepare("INSERT OR IGNORE INTO subscriptions (user_id, ticker) VALUES (?, ?)")
    insertion.run(user_id, ticker)
}

export function getFollows(user_id) {
    const lecture = db.prepare("SELECT DISTINCT ticker FROM subscriptions WHERE user_id = ?")
    const rows = lecture.all(user_id)
    return rows.map(r => r.ticker)
}

export function removeFollow(user_id, ticker) {
    const suppression = db.prepare("DELETE FROM subscriptions WHERE user_id = ? AND ticker = ?")
    const result = suppression.run(user_id, ticker)
    return result.changes > 0
}

export function getAllUsers() {
    const lecture = db.prepare("SELECT DISTINCT user_id FROM subscriptions")
    return lecture.all().map(r => r.user_id)
}


