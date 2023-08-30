type Level = "log" | "info" | "warn" | "error" | "debug" | "success";

export interface Pry { level: Level, title: string, message: string, directory?: string | null }

/**
 * A logging utility for both the NodeJS & browser JavaScript environments
 * 
 * @param {Level} config.level - Importance of the information being logged
 * @param {string} config.title - Headline or caption for the log entry
 * @param {string} config.message - Detailed content for the log entry
 * @param {string|null} config.directory - Absolute path where your log files be created
 */
export const logger = async ({ level = 'log', title, message, directory = null }: Partial<Pry>): Promise<void> => {
    const writer = typeof console[level] === "function"
        ? console[level]
        : console.log;

    const date = new Date().toISOString();

    let emoji;
    switch (level) {
        case "log":
            emoji = "📌";
            break;
        case "info":
            emoji = "🛟";
            break;
        case "warn":
            emoji = "❗";
            break;
        case "error":
            emoji = "❌";
            break;
        case "debug":
            emoji = "🐞";
            break;
        default:
            emoji = "🚩";
            break;
    }

    writer(`${emoji} [${date}] ${title}`, `\n${JSON.stringify(message, null, "....")}\n`);

    if (directory !== null) {
        try {
            const path = await import("path");
            const fs = await import("fs/promises");

            const handle = await fs.open(path.resolve(process.cwd(), directory, `${level}.log`), 'a+');

            const stream = handle.createWriteStream();

            stream.write(`${emoji} [${date}] ${title}\n`);
            stream.end(`${JSON.stringify(message, null, "....")}\n\n`);
        } catch (error) {
            console.error(error);
        }
    }
};

export const stdout = async ({ level = 'log', title, message }: Partial<Pry>): void => {
    const date = new Date().toISOString();

    let icon;
    let head;
    switch (level) {
        case "log":
            icon = "📌";
            head = '\x1b[34m[LOG]\x1b[0m' // blue
            break;
        case "info":
            icon = "🛟";
            head = '\x1b[36m[INFO]\x1b[0m' // cyan
            break;
        case "warn":
            icon = "❗";
            head = '\x1b[33m[WARNING]\x1b[0m' // yellow
            break;
        case "error":
            icon = "❌";
            head = '\x1b[31m[ERROR]\x1b[0m' // red
            break;
        case "debug":
            icon = "🐞";
            head = '\x1b[35m[DEBUG]\x1b[0m' // magenta
            break;
        case "success":
            icon = "✅";
            head = '\x1b[32m[SUCCESS]\x1b[0m' // green
            break;
        default:
            icon = "🚩";
            head = '\x1b[38;5;202m[FLAG]\x1b[0m' // orange
            break;
    }

    console.log(emoji, head, ` - [${date}]`, title, `\n${JSON.stringify(message, null, "....")}\n`);
}